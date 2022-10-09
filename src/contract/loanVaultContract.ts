import { BigNumber as ethersBn, ethers } from 'ethers'
import { coins, formatToLocaleString } from '../services/UtilService'
import loanVaultAbi from './loanVault.json'

interface LaudVaultContract {
  getLastPrice(collectionAddress: string): Promise<string>
}

const loanVaultContract = (): LaudVaultContract => {
  return {
    getLastPrice: async (collectionAddress: string) => {
      const provider = new ethers.providers.JsonRpcProvider(
        'https://responsive-neat-putty.ethereum-goerli.discover.quiknode.pro/6f3fda4618bcb8e1aa69584e19713e61e21a0502/'
      )
      const loanVaultReadContract: ethers.Contract = new ethers.Contract(
        '0x3227f9572a442fccC630CEBc036B41d1D3c0F48F',
        loanVaultAbi,
        provider
      )
      try {
        const florPrice = await loanVaultReadContract.getLatestPrice(collectionAddress.toLocaleLowerCase())
        const florPriceFormated = coins(ethersBn.from(florPrice.answer).toString(), 18)
        return florPriceFormated ? formatToLocaleString(florPriceFormated, 4) : '0'
      } catch (error) {
        console.log('error: ', error)
        return ''
      }
    }
  }
}

export default loanVaultContract
