import { notification } from 'antd'
import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import loanVaultContractWrite from '../contract/loanVaultContractWrite'
import { useTransaction } from './useTransaction'

const useWithdraw = (refetchData: () => void) => {
  const [isExecuting, setIsExecuting] = useState(false)

  const { status, observe, dismiss } = useTransaction()

  const withdraw = async (signerProvider: ethers.providers.Web3Provider) => {
    setIsExecuting(true)
    const transaction: string = await loanVaultContractWrite(signerProvider).withdraw()

    setIsExecuting(false)

    if (!transaction) {
      return
    }

    observe(transaction, signerProvider, 'https://api.thegraph.com/subgraphs/name/arthurmr96/flex-loan')
  }

  const notificationSuccessAddFounds = useCallback(() => {
    notification.success({
      message: `Withdraw successfully`,
      placement: 'top',
      duration: 2
    })
  }, [])

  useEffect(() => {
    if (status === 'success') {
      refetchData()
      dismiss()
      notificationSuccessAddFounds()
    }
    if (status === 'reverted') {
      console.error('error')
    }
  }, [status, dismiss, refetchData, notificationSuccessAddFounds])

  return {
    withdraw,
    isLoading: isExecuting,
    status,
    dismiss
  }
}

export default useWithdraw
