import BigNumber from 'bignumber.js'
import { BigNumber as ethersBn, ethers } from 'ethers'
import humanFormat from 'human-format'

export const formatToLocaleString = (
  value: string | number | BigNumber,
  maximumFractionDigits?: number,
  minimumFractionDigits?: number
) => {
  return new BigNumber(value).toNumber().toLocaleString('en-US', { maximumFractionDigits, minimumFractionDigits })
}

export function formatShortAccountName(address: string, size = 6): string {
  const finalChar = address.length > size && address.slice(-4)
  return [address.slice(0, size), finalChar].filter(Boolean).join('...')
}

export function formatShortAddressWallet(addressFormat: string): string {
  return `${addressFormat.slice(0, 3)}...${addressFormat.slice(-3)}`
}
export function toHumanFormat(value: number): string {
  if (value === 0 || Number.isNaN(value)) {
    return '0'
  }
  if (value > 0 && value < 1) {
    return formatToLocaleString(value, 5)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return humanFormat(Number(value), {
    separator: ''
  })
    .replace('G', 'B') // Necessary since the prefix for short scale is B, not G: https://en.wikipedia.org/wiki/Metric_prefix
    .toLowerCase()
}

export function formatSymbol(tokenSymbol: string) {
  return tokenSymbol.length > 6 ? `${tokenSymbol.substr(0, 6)}...` : tokenSymbol
}

export function valid(amount: string, decimals: number): boolean {
  const regex = new RegExp(`^\\d+${decimals > 0 ? `(\\.\\d{1,${decimals}})?` : ''}$`)
  return regex.test(amount)
}

export function units(coinsValue: string, decimals: number): string {
  if (!valid(coinsValue, decimals)) throw new Error('Invalid amount')
  let i = coinsValue.indexOf('.')
  if (i < 0) i = coinsValue.length
  const s = coinsValue.slice(i + 1)
  return coinsValue.slice(0, i) + s + '0'.repeat(decimals - s.length)
}

export function coins(unitsValue: string, decimals: number): string {
  if (!valid(unitsValue, 0)) throw new Error('Invalid amount')
  if (decimals === 0) return unitsValue
  const s = unitsValue.padStart(1 + decimals, '0')
  return `${s.slice(0, -decimals)}.${s.slice(-decimals)}`
}

export function getGasLimit(estimate: ethers.BigNumber, decimals = 18) {
  return new BigNumber(estimate.toString(), decimals).multipliedBy(1.2).toFixed(0).toString()
}

export async function getGasPrice(provider: ethers.providers.JsonRpcProvider) {
  const price = await provider.getGasPrice()
  return new BigNumber(price.toString()).multipliedBy(1.2).toFixed(0).toString()
}
export async function getEns(
  signerProvider: ethers.providers.Web3Provider | null,
  walletAccount: string
): Promise<{ name: string; avatar: string }> {
  if (!signerProvider || !walletAccount) {
    return {
      name: '',
      avatar: ''
    }
  }
  try {
    const ensName = await signerProvider.lookupAddress(walletAccount)
    const avatar = await signerProvider.getAvatar(walletAccount)
    const ens = {
      name: ensName || formatShortAddressWallet(walletAccount),
      avatar: avatar || ''
    }
    return ens
  } catch (error) {
    return {
      name: '',
      avatar: ''
    }
  }
}

export async function getBalance(signerProvider: ethers.providers.Web3Provider | null, walletAccount: string): Promise<string> {
  if (signerProvider) {
    const value = await signerProvider.getBalance(walletAccount)
    const balance = coins(ethersBn.from(value).toString(), 18)
    return formatToLocaleString(balance, 4)
  }
  return '0'
}
