import { ChainConfig } from './types/chainConfig'

const chainsConfig: ChainConfig[] = [
  {
    chainId: 1,
    name: 'Ethereum',
    nativeToken: {
      address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      symbol: 'ETH'
    },
    fantasyName: 'Ethereum',
    stablecoinAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
    scanAddress: 'https://etherscan.io'
  },
  {
    chainId: 5,
    name: 'Goerli',
    nativeToken: {
      address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      symbol: 'ETH'
    },
    fantasyName: 'Goerli',
    stablecoinAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
    scanAddress: 'https://goerli.etherscan.io/'
  }
]
const allowedChains = [1, 5]
export function isAllowedChain(chainId: number): boolean {
  return allowedChains.includes(chainId)
}

export const chainConfig = (id: number): ChainConfig => {
  const config = chainsConfig.find(chain => chain.chainId === id)

  if (!config) {
    // eslint-disable-next-line no-console
    console.error('No Config')
    return chainsConfig[0]
  }

  return config
}
