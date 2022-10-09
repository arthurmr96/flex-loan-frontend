import { useQuery, useReactiveVar } from '@apollo/client'
import { LenderBalanceQueryData, LenderBalanceQueryVars, LENDER_BALANCE_QUERY } from '@graphql/query/LenderBalanceQuery'
import { signerProviderVar, walletAccountVar } from '@graphql/variables/walletVariable'
import { coins } from '@services/UtilService'
import { Button, Card, Col, Form, Input, Row, Space, Typography } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import loanVaultContract from '../../contract/loanVaultContract'
import useDeposit from '../../hooks/useDeposit'
import useWithdraw from '../../hooks/useWithdraw'

const { Title, Text } = Typography

export function EarnContainer() {
  const walletAccount = useReactiveVar(walletAccountVar)
  const signerProvider = useReactiveVar(signerProviderVar)
  const [tvl, setTvl] = useState('0')
  const [lendedBalance, setLendedBalance] = useState('0')
  const [utilization, setUtilization] = useState('0')
  const [balance, setBalance] = useState('0')
  const [depositAmount, setDepositAmount] = useState('')

  const { data } = useQuery<LenderBalanceQueryData, LenderBalanceQueryVars>(LENDER_BALANCE_QUERY, {
    variables: {
      lender: walletAccount?.toLowerCase()
    },
    skip: !walletAccount
  })

  const handleSuccessDeposit = () => {
    setDepositAmount('')
    handleTvl()
    handleLendedBalance()
    handleBalance()
    update()
  }
  const { deposit, isLoading: depositLoading } = useDeposit(handleSuccessDeposit)
  const { withdraw, isLoading: withdrawLoading } = useWithdraw(handleSuccessDeposit)

  const handleTvl = useCallback(async () => {
    setTvl(await loanVaultContract().getLockedAmount())
  }, [])

  useEffect(() => {
    handleTvl()
  }, [handleTvl])

  const handleLendedBalance = useCallback(async () => {
    setLendedBalance(await loanVaultContract().getLendedAmount())
  }, [])

  useEffect(() => {
    handleLendedBalance()
  }, [handleLendedBalance])

  const handleBalance = useCallback(async () => {
    if (!signerProvider || !walletAccount) {
      return
    }

    const balanceCoins = coins((await signerProvider.getBalance(walletAccount)).toString(), 18)

    setBalance(Number(balanceCoins).toLocaleString('en', { maximumFractionDigits: 5 }))
  }, [signerProvider, walletAccount])
  useEffect(() => {
    handleBalance()
  }, [handleBalance])

  const update = useCallback(() => {
    if (!lendedBalance || !tvl) {
      return
    }

    setUtilization(((Number(tvl) / Number(lendedBalance)) * 100).toLocaleString('en', { maximumFractionDigits: 2 }))
  }, [lendedBalance, tvl])

  useEffect(() => {
    update()
  }, [update])

  return (
    <Row>
      <Col span={8}>
        <Space direction='vertical' size={16}>
          <Title style={{ marginBottom: '8px' }} level={4}>
            Stake Ethereum
          </Title>
          <Space direction='vertical' size={0}>
            <Text>Total Value Locked</Text>
            <Text strong>{tvl} ETH</Text>
          </Space>
          <Space direction='vertical' size={0}>
            <Text>Total Lend</Text>
            <Text strong>{lendedBalance} ETH</Text>
          </Space>
          <Space direction='vertical' size={0}>
            <Text>Utilization</Text>
            <Text strong>{utilization}%</Text>
          </Space>
          <Space direction='vertical' size={0}>
            <Text>Lending Yield</Text>
            <Text strong>12% yearly</Text>
          </Space>
        </Space>
      </Col>
      <Col span={16}>
        <Space direction='vertical' size={16}>
          <Title style={{ marginBottom: '8px' }} level={4}>
            My Stake
          </Title>
          <Row gutter={[8, 0]}>
            <Col span={12}>
              <Card>
                <Space direction='vertical' size={16}>
                  <Form.Item label='Deposit amount' extra={<Text type='secondary'>Balance: {balance} ETH</Text>}>
                    <Input
                      onChange={e => setDepositAmount(e.target.value)}
                      value={depositAmount}
                      addonBefore={<Text>ETH</Text>}
                      type='number'
                    />
                  </Form.Item>
                  {signerProvider && (
                    <Button
                      disabled={!depositAmount}
                      block
                      type='primary'
                      onClick={() => deposit(signerProvider, depositAmount)}
                      loading={depositLoading}
                    >
                      Deposit
                    </Button>
                  )}
                </Space>
              </Card>
            </Col>
            <Col span={12}>
              <Card style={{ height: '182px' }}>
                <Row>
                  <Col span={12}>
                    <Space direction='vertical' size={4}>
                      <Text>Deposited</Text>
                      <Text strong>
                        {Number(coins(data?.lender?.amount || '0', 18)).toLocaleString('en', { maximumFractionDigits: 5 })} ETH
                      </Text>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space direction='vertical' size={4}>
                      <Text>Interest Earned</Text>
                      <Text strong>0 ETH</Text>
                    </Space>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Space direction='vertical' size={4}>
                      <Text>Total</Text>
                      <Text strong>
                        {Number(coins(data?.lender?.amount || '0', 18)).toLocaleString('en', { maximumFractionDigits: 5 })} ETH
                      </Text>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space direction='vertical' size={4}>
                      <Text />
                      {signerProvider && (
                        <Button
                          disabled={!data?.lender?.amount}
                          onClick={() => withdraw(signerProvider)}
                          block
                          type='primary'
                          loading={withdrawLoading}
                        >
                          Withdraw
                        </Button>
                      )}
                    </Space>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Space>
      </Col>
    </Row>
  )
}
