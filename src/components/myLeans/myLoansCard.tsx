/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Tag, Typography } from 'antd'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { coins } from '@services/UtilService'
import { geterc721Metadata } from '../../contract/erc721/erc721CollectionMetadata'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MyLoanCard(data: any) {
  const [nftMetadata, setNftMetadata] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [entryPrice, setEntryPrice] = useState('')
  const [floorPrice, setFloorPrice] = useState('')
  const [liquidityPrice, setLiquidityPrice] = useState('')
  const [marginRatio, setMarginRatio] = useState('')
  const [redeemCost, setRedeemCost] = useState('')
  const { Text } = Typography
  const avatar = ''

  useEffect(() => {
    const get = async () => {
      setLoading(true)

      const metaData = await geterc721Metadata(
        data.data.collateralTargetAddress || '0x46bef163d6c470a4774f9585f3500ae3b642e751',
        data.data.collateralTargetTokenId || '9'
      )
      setNftMetadata(metaData)
      setLoading(false)
    }
    get()
  }, [data.data.collateralTargetAddress, data.data.collateralTargetTokenId])

  useEffect(() => {
    setEntryPrice(Number(coins(data.data.amount, 18)).toLocaleString('en', { maximumFractionDigits: 5 }))
  }, [data.data.amount])

  useEffect(() => {
    setFloorPrice((Number(entryPrice) * 1.4).toLocaleString('en', { maximumFractionDigits: 5 }))
  }, [entryPrice])

  useEffect(() => {
    setLiquidityPrice((Number(floorPrice) * 0.7).toLocaleString('en', { maximumFractionDigits: 5 }))
  }, [floorPrice])

  useEffect(() => {
    setMarginRatio((Number(floorPrice) * 0.3).toLocaleString('en', { maximumFractionDigits: 5 }))
  }, [floorPrice])

  useEffect(() => {
    const cost = Number(data.data.duration) / 10000
    setRedeemCost((Number(entryPrice) + cost).toLocaleString('en', { maximumFractionDigits: 5 }))
  }, [data.data.duration, data.data.interestRatio, entryPrice])

  return (
    <LeansContainer>
      {nftMetadata && !loading && <ContainerNft src={nftMetadata.rawMetadata.image} />}
      <ContainerInfo>
        <LeansCollection>
          {avatar ? <Avatar size={32} shape='circle' src='' /> : <Avatar size={32} shape='circle' icon={<UserOutlined />} />}
          <Text>{nftMetadata?.contract.name || ''}</Text>
          <Tag color='success'>{data.data.status || 'active'}</Tag>
        </LeansCollection>
        <LeansDetail>
          <div>
            <Text>Locked NFT (ID): </Text>
            <Text strong>#{data.data.collateralTargetTokenId || ''}</Text>
          </div>
          <div>
            <Text>Entry price </Text>
            <Text strong>{entryPrice} ETH</Text>
          </div>
          <div>
            <Text>Floor price: </Text>
            <Text strong>{floorPrice} ETH</Text>
          </div>
          <div>
            <Text>Liquidation Price: </Text>
            <Text strong>{liquidityPrice} ETH</Text>
          </div>
          <div>
            <Text>Margin Ratio </Text>
            <Text strong>{marginRatio} ETH</Text>
          </div>
          <div>
            <Text>Borrow Interest: </Text>
            <Text strong>12%</Text>
          </div>
          <div>
            <Text>Redeem Cost</Text>
            <Text strong>{redeemCost} ETH</Text>
          </div>
        </LeansDetail>
        <Button type='primary' style={{ width: '95px' }}>
          Redeem
        </Button>
      </ContainerInfo>
    </LeansContainer>
  )
}

const {
  LeansContainer,
  ContainerNft,
  LeansInfo: ContainerInfo,
  LeansCollection,
  LeansDetail
} = {
  ContainerNft: styled.img`
    width: 120px;
    height: 160px;
    border-radius: 12px;
    object-fit: cover;
  `,
  LeansContainer: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 8px 16px 8px 8px;
    gap: 24px;

    border: 1px solid #f0f0f0;
    border-radius: 12px;
  `,
  LeansInfo: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 18px;
  `,
  LeansCollection: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  LeansDetail: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

    > div {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
  `
}

export default MyLoanCard
