import { BigNumber as ethersBn, ethers } from 'ethers'
import { coins, formatToLocaleString } from '../services/UtilService'
import loanVaultAbi from './loanVault.json'

const loanVaultContract = () => {
  return {
    getLastPrice: async (collectionAddress: string) => {
      const provider = new ethers.providers.JsonRpcProvider(
        'https://responsive-neat-putty.ethereum-goerli.discover.quiknode.pro/6f3fda4618bcb8e1aa69584e19713e61e21a0502/'
      )
      const loanVaultReadContract: ethers.Contract = new ethers.Contract(
        '0xa20EB2573a8fe6872da89E0F3ec81c147d32F613',
        loanVaultAbi,
        provider
      )
      try {
        const florPrice = await loanVaultReadContract.collectionPrice(collectionAddress.toLocaleLowerCase())
        const florPriceFormated = coins(ethersBn.from(florPrice.answer).toString(), 18)
        console.log('florPriceFormated', florPriceFormated)
        return florPriceFormated ? formatToLocaleString(florPriceFormated, 4) : '0'
      } catch (error) {
        console.log('error:12 ', error)
        return ''
      }
    },
    getTvl: async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        'https://responsive-neat-putty.ethereum-goerli.discover.quiknode.pro/6f3fda4618bcb8e1aa69584e19713e61e21a0502/'
      )
      const loanVaultReadContract: ethers.Contract = new ethers.Contract(
        '0xa20EB2573a8fe6872da89E0F3ec81c147d32F613',
        loanVaultAbi,
        provider
      )

      const balance: Promise<string> = await loanVaultReadContract.lockedAmount()

      return Number(coins(balance?.toString() || '0', 18)).toLocaleString('en', { maximumFractionDigits: 5 })
    }
  }
}

export default loanVaultContract
