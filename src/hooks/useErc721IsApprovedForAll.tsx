import { useCallback, useEffect, useState } from 'react'
import { erc721ContractRead } from '../contract/erc721/Erc721ContractRead'

export function useErc721IsApprovedForAll(collectionAddress: string, ownerAddress: string, operator: string) {
  const [isApprovedForAll, setIsApprovedForAll] = useState(false)
  const [loading, setLoading] = useState(true)
  const verifyIsApproveForAll = useCallback(async () => {
    if (!collectionAddress || !ownerAddress) return
    setLoading(true)
    setIsApprovedForAll(await erc721ContractRead().isApprovedForAll(collectionAddress, ownerAddress, operator))
    setLoading(false)
  }, [collectionAddress, operator, ownerAddress])

  useEffect(() => {
    verifyIsApproveForAll()
  }, [collectionAddress, ownerAddress, verifyIsApproveForAll])

  return {
    isApprovedForAll,
    isLoading: loading,
    verifyIsApproveForAll
  }
}
