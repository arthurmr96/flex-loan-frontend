import { ethers } from 'ethers'
import { useState } from 'react'
import { erc721Contract } from '../contract/erc721/Erc721Contract'
import { useTransaction } from './useTransaction'

export const useErc721SetApprovalForAll = () => {
  const [isExecuting, setIsExecuting] = useState(false)

  const { isLoading: isObserving, status, observe, dismiss } = useTransaction()

  const setApprovalForAll = async (signerProvider: ethers.providers.Web3Provider, contractAddress: string, spenderAddress: string) => {
    setIsExecuting(true)
    const tx = await erc721Contract(signerProvider).setApprovalForAll(contractAddress, spenderAddress, true)

    setIsExecuting(false)

    if (!tx) {
      return
    }

    observe(tx, signerProvider)
  }

  return {
    isLoading: isExecuting || isObserving,
    setApprovalForAll,
    dismiss,
    status
  }
}
