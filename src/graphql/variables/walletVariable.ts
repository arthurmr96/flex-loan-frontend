import { makeVar } from '@apollo/client'
import { ethers } from 'ethers'

export const walletAccountVar = makeVar<string>('')
export const walletChainIdVar = makeVar<number | null>(null)
export const signerProviderVar = makeVar<ethers.providers.Web3Provider | null>(null)
export const clearMultiWalletVars = () => {
  walletAccountVar('')
  walletChainIdVar(null)
  signerProviderVar(null)
}
