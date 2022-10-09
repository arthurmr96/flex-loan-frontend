import { Button, Card, Col, Form, Input, Row, Space, Typography } from 'antd'

const { Title, Text } = Typography

export function EarnContainer() {
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
                  <Form.Item label='Deposit amount' extra='Balance'>
                    <Input.Search enterButton={<Button>Use max</Button>} addonBefore={<Text>ETH</Text>} type='number' />
                  </Form.Item>
                  <Button block type='primary'>
                    Deposit
                  </Button>
                </Space>
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Space direction='vertical' size={16}>
                  <Form.Item label='Withdraw amount' extra='Stake'>
                    <Input.Search enterButton={<Button>Use max</Button>} addonBefore={<Text>ETH</Text>} type='number' />
                  </Form.Item>
                  <Button block type='primary'>
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
