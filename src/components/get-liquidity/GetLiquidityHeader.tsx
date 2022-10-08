import { Col, Row, Typography } from 'antd'

function GetLiquidityHeader() {
  return (
    <>
      <Row align='middle' justify='center'>
        <Col>
          <Typography.Title style={{ margin: '26px 0px 0 0' }}>Borrow NFT</Typography.Title>
        </Col>
      </Row>
      <Row align='middle' justify='center'>
        <Col>
          <Typography.Text type='secondary'>Take advantge of the value of the nft, and keep your ownership</Typography.Text>
        </Col>
      </Row>
    </>
  )
}

export default GetLiquidityHeader
