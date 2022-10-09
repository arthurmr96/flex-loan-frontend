import { UserOutlined } from '@ant-design/icons'
import { Avatar, Typography } from 'antd'
import styled from 'styled-components'

function MyLeansContainer() {
  const { Text } = Typography
  const avatar = ''
  return (
    <LeansContainer>
      <ContainerNft />
      <ContainerInfo>
        <LeansCollection>
          {avatar ? <Avatar size={32} shape='circle' src='' /> : <Avatar size={32} shape='circle' icon={<UserOutlined />} />}
          <Text>Bored Ape Yatch Club</Text>
        </LeansCollection>
        <LeansDetail>
          <div>
            <Text>Locked NFT (ID): </Text>
            <Text strong>#5436</Text>
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
  ContainerNft: styled.div`
    width: 120px;
    height: 160px;
    background: #13c2c2;
    border-radius: 12px;
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

export default MyLeansContainer
