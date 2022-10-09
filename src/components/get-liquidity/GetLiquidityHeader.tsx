import { Col, Row, Typography } from 'antd'

function GetLiquidityHeader() {
  return (
    <>
      <Row align='middle' justify='center'>
        <Col>
          <Typography.Title style={{ margin: '26px 0px 0 0' }}>Flexibility for NFT owners</Typography.Title>
        </Col>
      </Row>
      <Row align='middle' justify='center'>
        <Col>
          <Typography.Text type='secondary'>We allow NFT owners to get liquidity</Typography.Text>
        </Col>
      </Row>
    </>
  )
}

export default GetLiquidityHeader
