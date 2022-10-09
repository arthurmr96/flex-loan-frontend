import { UserOutlined } from '@ant-design/icons'
import { makeVar, useReactiveVar } from '@apollo/client'
import { Avatar, Button, Col, Divider, Input, Modal, Radio, RadioChangeEvent, Row, Typography } from 'antd'
import BigNumber from 'bignumber.js'
import { useState } from 'react'
import styled from 'styled-components'
import { signerProviderVar } from '../../graphql/variables/walletVariable'
import useLoan from '../../hooks/useLoan'
import { formatToLocaleString } from '../../services/UtilService'
import { DataTable } from '../../types/GetLiquidity'

export const getLoanModalVar = makeVar<DataTable | null>(null)
export function GetLoanModal() {
  const signerProvider = useReactiveVar(signerProviderVar)
  const [tokenId, setTokenId] = useState('')
  const [duration, setDuration] = useState(1)
  const getLoanModal = useReactiveVar(getLoanModalVar)
  const { loan, isLoading } = useLoan(() => console.log('terminou'))
  const onChange = (e: RadioChangeEvent) => {
    setDuration(e.target.value as number)
  }
  const handleCancel = () => {
    getLoanModalVar(null)
  }
  const avalibleLiquidity = new BigNumber(getLoanModal?.florPrice.replace('ETH', '') || '0').multipliedBy(0.6)
  const liquidityPrice = new BigNumber(getLoanModal?.florPrice.replace('ETH', '') || '0').multipliedBy(0.7)

  async function handleLoan() {
    if (!signerProvider) return
    console.log('entrei')
    await loan(signerProvider, tokenId, getLoanModal?.collectionAddress || '', duration)
  }

  return (
    <Modal title='Get Liquidity' footer='' open={!!getLoanModal} onOk={handleCancel} onCancel={handleCancel} destroyOnClose>
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <ContainerCollection>
            {getLoanModal ? (
              <Avatar size={32} shape='circle' src={getLoanModal.collectionImage} />
            ) : (
              <Avatar size={32} shape='circle' icon={<UserOutlined />} />
            )}
            <Typography.Text>{getLoanModal?.collectionName}</Typography.Text>
          </ContainerCollection>
        </Col>
        <Col span={24}>
          <ContainerInfo>
            <Typography.Text>{`Collection Floor price: ${getLoanModal?.florPrice || '0'} ETH`}</Typography.Text>
            <Typography.Text>{`Avalible Liquidity: ${formatToLocaleString(avalibleLiquidity, 4)} ETH`}</Typography.Text>
            <Typography.Text>{`${`Borrow Interest: 12%`}`}</Typography.Text>
            <Typography.Text>{`${`Liquidation Price: ${formatToLocaleString(liquidityPrice, 4)} ETH`}`}</Typography.Text>
          </ContainerInfo>
        </Col>
        <Col span={24}>
          <Divider style={{ margin: '0' }} />
        </Col>
        <Col span={24}>
          <ContainerInput>
            <Typography.Text>Token ID</Typography.Text>
            <Input type='number' value={tokenId} onChange={e => setTokenId(e.target.value)} />
          </ContainerInput>
        </Col>
        <Col span={24}>
          <ContainerInput>
            <Typography.Text>Loan Duration</Typography.Text>
            <Radio.Group onChange={onChange} defaultValue={1}>
              <Radio.Button value={1}>1 month</Radio.Button>
              <Radio.Button value={2}>2 month</Radio.Button>
              <Radio.Button value={3}>3 month</Radio.Button>
            </Radio.Group>
          </ContainerInput>
        </Col>
        <Col span={24}>
          <Button type='primary' disabled={!signerProvider} block loading={isLoading} onClick={handleLoan}>
            Get Loan
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

const { ContainerCollection, ContainerInfo, ContainerInput } = {
  ContainerCollection: styled.div`
    width: 100%;
    background: #f5f5f5;
    padding: 16px 19px;
    display: flex;
    align-items: center;
    gap: 16px;
    border-radius: 12px;
  `,
  ContainerInfo: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  ContainerInput: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  `
}
