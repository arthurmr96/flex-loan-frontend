export interface ChainConfig {
  chainId: number
  name: string
  fantasyName: string
  nativeToken: {
    address: string
    decimals: number
    symbol: string
  }
  stablecoinAddress: string
  scanAddress: string
}
