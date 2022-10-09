import { Button, Card, Col, Form, Input, Row, Space, Typography } from 'antd'
import { useQuery, useReactiveVar } from '@apollo/client'
import { signerProviderVar, walletAccountVar } from '@graphql/variables/walletVariable'
import { useEffect, useState } from 'react'
import { LENDER_BALANCE_QUERY, LenderBalanceQueryData, LenderBalanceQueryVars } from '@graphql/query/LenderBalanceQuery'
import { coins } from '@services/UtilService'

const { Title, Text } = Typography

export function EarnContainer() {
  const walletAccount = useReactiveVar(walletAccountVar)
  const signerProvider = useReactiveVar(signerProviderVar)
  const [balance, setBalance] = useState('0')
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')

  const { data } = useQuery<LenderBalanceQueryData, LenderBalanceQueryVars>(LENDER_BALANCE_QUERY, {
    variables: {
      lender: walletAccount
    },
    skip: !walletAccount
  })

  useEffect(() => {
    const handleBalance = async () => {
      if (!signerProvider || !walletAccount) {
        return
      }

      const balanceCoins = coins((await signerProvider.getBalance(walletAccount)).toString(), 18)

      setBalance(Number(balanceCoins).toLocaleString('en', { maximumFractionDigits: 5 }))
    }

    handleBalance()
  }, [signerProvider, walletAccount])

  return (
    <Row>
      <Col span={8}>
        <Space direction='vertical' size={16}>
          <Title style={{ marginBottom: '8px' }} level={4}>
            Stake Ethereum
          </Title>
          <Space direction='vertical' size={0}>
            <Text>Total Value Locked</Text>
            <Text strong>Total Value Locked</Text>
          </Space>
          <Space direction='vertical' size={0}>
            <Text>Total Borrow</Text>
            <Text strong>Total Value Locked</Text>
          </Space>
          <Space direction='vertical' size={0}>
            <Text>Utilization</Text>
            <Text strong>Total Value Locked</Text>
          </Space>
          <Space direction='vertical' size={0}>
            <Text>Lending Yield</Text>
            <Text strong>Total Value Locked</Text>
          </Space>
        </Space>
      </Col>
      <Col span={16}>
        <Space direction='vertical' size={16}>
          <Title style={{ marginBottom: '8px' }} level={4}>
            My lending
          </Title>
          <Row gutter={[8, 0]}>
            <Col span={8}>
              <Space direction='vertical' size={4}>
                <Text>Deposited</Text>
                <Text strong>Total Value Locked</Text>
              </Space>
            </Col>
            <Col span={8}>
              <Space direction='vertical' size={4}>
                <Text>Interest Earned</Text>
                <Text strong>Total Value Locked</Text>
              </Space>
            </Col>
            <Col span={8}>
              <Space direction='vertical' size={4}>
                <Text>Total</Text>
                <Text strong>Total Value Locked</Text>
              </Space>
            </Col>
          </Row>
          <Row gutter={[8, 0]}>
            <Col span={12}>
              <Card>
                <Space direction='vertical' size={16}>
                  <Form.Item label='Deposit amount' extra={<Text type='secondary'>Balance: {balance} ETH</Text>}>
                    <Input.Search
                      onChange={e => setDepositAmount(e.target.value)}
                      value={depositAmount}
                      enterButton={<Button>Use max</Button>}
                      addonBefore={<Text>ETH</Text>}
                      type='number'
                    />
                  </Form.Item>
                  <Button disabled={!depositAmount} block type='primary'>
                    Deposit
                  </Button>
                </Space>
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Space direction='vertical' size={16}>
                  <Form.Item
                    label='Withdraw amount'
                    extra={
                      <Text type='secondary'>
                        Stake: {Number(coins(data?.lender?.amount || '0', 18)).toLocaleString('en', { maximumFractionDigits: 5 })} ETH
                      </Text>
                    }
                  >
                    <Input.Search
                      onChange={e => setWithdrawAmount(e.target.value)}
                      value={withdrawAmount}
                      enterButton={<Button>Use max</Button>}
                      addonBefore={<Text>ETH</Text>}
                      type='number'
                    />
                  </Form.Item>
                  <Button disabled={!withdrawAmount} block type='primary'>
                    Withdraw
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </Space>
      </Col>
    </Row>
  )
}
