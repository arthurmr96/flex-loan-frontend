import { useEffect, useState } from 'react'
import { erc721ContractRead } from '../contract/erc721/Erc721ContractRead'

export function useErc721IsApprovedForAll(collectionAddress: string, ownerAddress: string) {
  const [isApprovedForAll, setIsApprovedForAll] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const verify = async () => {
      setLoading(true)
      setIsApprovedForAll(await erc721ContractRead().isApprovedForAll(collectionAddress, ownerAddress))
      setLoading(false)
    }
    verify()
  }, [collectionAddress, ownerAddress])

  return {
    isApprovedForAll,
    isLoading: loading
  }
}
