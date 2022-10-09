import { Alchemy, Network } from 'alchemy-sdk'

export async function geterc721Metadata(collectionAddress: string, tokenId: string) {
  const settings = {
    apiKey: 'q3Kg4nVXQJI1bS193RDVbd-oCh_zqAFS', // Replace with your Alchemy API Key.
    network: Network.ETH_GOERLI // Replace with your network.
  }

  const alchemy = new Alchemy(settings)
  const data: any = await alchemy.nft.getNftMetadata(collectionAddress, tokenId)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data
}
