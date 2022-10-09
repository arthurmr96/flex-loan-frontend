/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Tag, Typography } from 'antd'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { geterc721Metadata } from '../../contract/erc721/erc721CollectionMetadata'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MyLoanCard(data: any) {
  const [nftMetadata, setNftMetadata] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { Text } = Typography
  const avatar = ''

  useEffect(() => {
    const get = async () => {
      setLoading(true)

      const metaData = await geterc721Metadata(
        data.collateralTargetAddress || '0x46bef163d6c470a4774f9585f3500ae3b642e751',
        data.collateralTargetTokenId || '9'
      )
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setNftMetadata(metaData)
      setLoading(false)
    }
    get()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <LeansContainer>
      {nftMetadata && !loading && <ContainerNft src={nftMetadata.rawMetadata.image} />}
      <ContainerInfo>
        <LeansCollection>
          {avatar ? <Avatar size={32} shape='circle' src='' /> : <Avatar size={32} shape='circle' icon={<UserOutlined />} />}
          <Text>{nftMetadata?.contract.name || ''}</Text>
          <Tag color='success'>active</Tag>
        </LeansCollection>
        <LeansDetail>
          <div>
            <Text>Locked NFT (ID): </Text>
            <Text strong>#{data.collateralTargetTokenId || ''}</Text>
          </div>
          <div>
            <Text>Entry price </Text>
            <Text strong>10 ETH</Text>
          </div>
          <div>
            <Text>Floor price: </Text>
            <Text strong>10 ETH</Text>
          </div>
          <div>
            <Text>Liquidation Price: </Text>
            <Text strong>10 ETH</Text>
          </div>
          <div>
            <Text>Margin Ration </Text>
            <Text strong>10 ETH</Text>
          </div>
          <div>
            <Text>Borrow Interest: </Text>
            <Text strong>10 ETH</Text>
          </div>
          <div>
            <Text>Redeem Cost</Text>
            <Text strong>10 ETH</Text>
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
