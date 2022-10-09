import { ethers } from 'ethers'
import fromExponential from 'from-exponential'
import { getGasLimit, getGasPrice } from '../services/UtilService'
import loanVaultAbi from './loanVault.json'

const loanVaultContractWrite = (signerProvider: ethers.providers.Web3Provider) => {
  const signer: ethers.Signer = signerProvider.getSigner()
  const loanVaultContract: ethers.Contract = new ethers.Contract('0xa20EB2573a8fe6872da89E0F3ec81c147d32F613', loanVaultAbi, signer)

  return {
    loan: async (tokenId: string, collectionAddress: string, duration: number) => {
      const durationSeconds = duration * 30 * 24 * 60 * 60
      const interestRate = fromExponential(12 / 12 / 30 / 24 / 60 / 60)
      const gasLimit = await loanVaultContract.estimateGas.loan(collectionAddress, tokenId, durationSeconds, interestRate.replace('.', ''))
      const gasPrice = await getGasPrice(signerProvider)
      const approveTransaction: ethers.Transaction = await loanVaultContract.loan(
        collectionAddress,
        tokenId,
        durationSeconds,
        interestRate.replace('.', ''),
        {
          gasLimit: getGasLimit(gasLimit),
          gasPrice
        }
      )
      return approveTransaction.hash as string
    },
    deposit: async (amount: string) => {
      const gasLimit = await loanVaultContract.estimateGas.lend({ value: ethers.utils.parseEther(amount) })
      const gasPrice = await getGasPrice(signerProvider)
      const depositTransaction: ethers.Transaction = await loanVaultContract.lend({
        gasLimit: getGasLimit(gasLimit),
        gasPrice,
        value: ethers.utils.parseEther(amount)
      })
      return depositTransaction.hash as string
    },
    withdraw: async () => {
      const depositTransaction: ethers.Transaction = await loanVaultContract.withdraw()
      return depositTransaction.hash as string
    }
  }
}

export default loanVaultContractWrite
