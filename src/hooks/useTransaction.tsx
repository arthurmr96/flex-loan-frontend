import { useReactiveVar } from '@apollo/client'
import { providers } from 'ethers'
import { useState } from 'react'
import { transactionProcessingVar, TransactionStatus } from '../graphql/variables/transactionVariable'
import { theGraphService } from '../services/theGraphService'

interface UseTransactionData {
  status: TransactionStatus
  isLoading: boolean
  observe: (txHash: string, provider: providers.Web3Provider, subgraphUrl?: string) => Promise<void>
  dismiss: () => void
}

export const useTransaction = (): UseTransactionData => {
  const transactionProcessing = useReactiveVar(transactionProcessingVar)
  const [status, setStatus] = useState<TransactionStatus>('standby')

  const verifySubgraph = async (subgraph: string, blockNumber: number) => {
    if (!subgraph || !blockNumber) {
      return
    }

    const observeTheGraph = setInterval(async () => {
      const isSubgraphSynced = await theGraphService().isSynced(blockNumber, subgraph)

      if (!isSubgraphSynced) {
        return
      }

      clearInterval(observeTheGraph)
      transactionProcessingVar(false)
      setStatus('success')
    }, 2 * 1000)
  }

  const dismiss = () => {
    setStatus('standby')
    transactionProcessingVar(false)
  }

  const observe = async (txHash: string, provider: providers.Web3Provider, subgraphUrl?: string) => {
    setStatus('pending')
    transactionProcessingVar(true)

    try {
      const confirmed = await provider.waitForTransaction(txHash)

      if (subgraphUrl && confirmed.status === 1) {
        verifySubgraph(subgraphUrl, confirmed.blockNumber)
        return
      }

      setStatus(confirmed.status === 1 ? 'success' : 'reverted')
      transactionProcessingVar(false)
    } catch (error) {
      setStatus('reverted')
      transactionProcessingVar(false)
    }
  }

  return {
    status,
    isLoading: transactionProcessing,
    observe,
    dismiss
  }
}
