import { ethers } from 'ethers'
import { erc721Abi } from './Erc721Abi'

interface Erc721ContractRead {
  isApprovedForAll(contractAddress: string, owner: string, operator: string): Promise<boolean>
}

export const erc721ContractRead = (): Erc721ContractRead => {
  return {
    async isApprovedForAll(contractAddress: string, owner: string, operator: string): Promise<boolean> {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          'https://responsive-neat-putty.ethereum-goerli.discover.quiknode.pro/6f3fda4618bcb8e1aa69584e19713e61e21a0502/'
        )
        const erc721 = new ethers.Contract(contractAddress, erc721Abi, provider)

        const isApproved = await erc721.isApprovedForAll(owner, operator)

        return (isApproved as boolean) || false
      } catch (e) {
        console.error(e, 'Failed to execute transaction')
        return false
      }
    }
  }
}
