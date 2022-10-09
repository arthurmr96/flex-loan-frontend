import { makeVar } from '@apollo/client'

export const transactionProcessingVar = makeVar<boolean>(false)
export const preparingTransactionVar = makeVar<boolean>(false)
export const transactionLoadingVar = makeVar<boolean>(false)
export type EvmRawTx = {
  from: string
  to: string
  data: string
  gasPrice: number
  gas: number
}

export type TransactionStatus = 'standby' | 'success' | 'reverted' | 'pending'
