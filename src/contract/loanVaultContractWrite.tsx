import { ethers } from 'ethers'
import fromExponential from 'from-exponential'
import loanVaultAbi from './loanVault.json'

interface LaudVaultContract {
  loan(tokenId: string, collectionAddress: string, duration: number): Promise<string>
}

const loanVaultContractWrite = (signerProvider: ethers.providers.Web3Provider): LaudVaultContract => {
  const signer: ethers.Signer = signerProvider.getSigner()
  const loanVaultContract: ethers.Contract = new ethers.Contract('0x3227f9572a442fccC630CEBc036B41d1D3c0F48F', loanVaultAbi, signer)

  return {
    loan: async (tokenId: string, collectionAddress: string, duration: number) => {
      const durationSeconds = duration * 30 * 24 * 60 * 60
      const interestRate = 12 / 12 / 30 / 24 / 60 / 60
      console.log('durationSeconds', durationSeconds)
      console.log('interestRate', fromExponential(interestRate))
      console.log('tokenId', tokenId)
      console.log('collectionAddress', collectionAddress)
      const approveTransaction: ethers.Transaction = await loanVaultContract.loan(collectionAddress, tokenId, durationSeconds, interestRate)
      return approveTransaction.hash as string
    }
  }
}

export default loanVaultContractWrite
