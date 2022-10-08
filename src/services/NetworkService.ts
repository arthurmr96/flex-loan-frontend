export enum NetworksId {
  ethereum = 1,
  rinkeby = 4,
  goerli = 5,
  mumbai = 80001
}

export enum NetworksName {
  'ethereum' = 'ethereum',
  'rinkeby' = 'rinkeby',
  'goerli' = 'goerli',
  'mumbai' = 'mumbai'
}

export const networkIdByName = (network: string) => {
  switch (network) {
    case NetworksName.ethereum:
      return NetworksId.ethereum
    case NetworksName.rinkeby:
      return NetworksId.rinkeby
    case NetworksName.goerli:
      return NetworksId.goerli
    case NetworksName.mumbai:
      return NetworksId.mumbai
    default:
      return ''
  }
}
export const networkNameById = (network: number) => {
  switch (network) {
    case NetworksId.ethereum:
      return NetworksName.ethereum
    case NetworksId.rinkeby:
      return NetworksName.rinkeby
    case NetworksId.goerli:
      return NetworksName.goerli
    case NetworksId.mumbai:
      return NetworksName.mumbai
    default:
      return ''
  }
}
