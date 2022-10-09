import { ChromeOutlined } from '@ant-design/icons'
import azuki from '@assets/azuki.svg'
import boredApe from '@assets/bored-ape.svg'
import criptopunks from '@assets/criptopunks.svg'

import { Avatar, Button, Col, Row, Table, Typography } from 'antd'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import loanVaultContract from '../../contract/loanVaultContract'
import { DataTable } from '../../types/GetLiquidity'
import { GetLoanModal, getLoanModalVar } from './GetLoanModal'

function GetLiquidityTableData() {
  const [tableData, setTableData] = useState<DataTable[]>([])
  const [loading, setLoading] = useState(true)
  const columns = [
    {
      title: 'Avalible Collection',
      dataIndex: 'collectionAddress',
      key: 'collectionAddress',
      render: (_: unknown, data: DataTable) => (
        <CollectionContainer>
          {data.collectionImage ? (
            <Avatar size={32} shape='circle' src={data.collectionImage} />
          ) : (
            <Avatar size={32} shape='circle' icon={<ChromeOutlined />} />
          )}
          <Typography.Text>{data.collectionName}</Typography.Text>
        </CollectionContainer>
      )
    },
    {
      title: 'Floor Price',
      dataIndex: 'florPrice',
      key: 'florPrice'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (_: unknown, data: DataTable) => (
        <Button type='primary' ghost onClick={() => getLoanModalVar(data)}>
          Get Loan
        </Button>
      )
    }
  ]
  useEffect(() => {
    const resolvFlorPrice = async () => {
      setLoading(true)
      const dataSource = [
        {
          collectionAddress: '0x9F6d70CDf08d893f0063742b51d3E9D1e18b7f74',
          collectionName: 'Azuki',
          collectionImage: azuki.src,
          florPrice: `${await loanVaultContract().getLastPrice('0x9F6d70CDf08d893f0063742b51d3E9D1e18b7f74')} ETH`
        },
        {
          collectionAddress: '0xB677bfBc9B09a3469695f40477d05bc9BcB15F50',
          collectionName: 'Bored Ape',
          collectionImage: boredApe.src,
          florPrice: `${await loanVaultContract().getLastPrice('0xB677bfBc9B09a3469695f40477d05bc9BcB15F50')} ETH`
        },
        {
          collectionAddress: '0x5c13b249846540F81c093Bc342b5d963a7518145',
          collectionName: 'Crypto punk',
          collectionImage: criptopunks.src,
          florPrice: `${await loanVaultContract().getLastPrice('0x5c13b249846540F81c093Bc342b5d963a7518145')} ETH`
        },
        {
          collectionAddress: '0x46bEF163D6C470a4774f9585F3500Ae3b642e751',
          collectionName: 'Blokies',
          collectionImage: '',
          florPrice: `${await loanVaultContract().getLastPrice('0x46bEF163D6C470a4774f9585F3500Ae3b642e751')} ETH`
        }
      ]
      setTableData(dataSource)
      setLoading(false)
    }
    resolvFlorPrice()
  }, [])
  return (
    <>
      <Row>
        <Col span={24}>
          <Table loading={loading} columns={columns} dataSource={tableData} style={{ overflow: 'auto' }} pagination={false} />
        </Col>
      </Row>
      <GetLoanModal />
    </>
  )
}
const { CollectionContainer } = {
  CollectionContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 32px;
  `
}
export default GetLiquidityTableData
