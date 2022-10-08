import { makeVar, useReactiveVar } from '@apollo/client'
import { Col, Modal, Row } from 'antd'
import styled from 'styled-components'

interface ParticipantsModalProps {
  chainId: number
}

export const getLoanModalVar = makeVar(false)

export function ParticipantsModal({ chainId }: ParticipantsModalProps) {
  const getLoanModal = useReactiveVar(getLoanModalVar)
  const handleCancel = () => {
    getLoanModalVar(false)
  }
  return (
    <Modal title='Get Liquidity' footer='' open={getLoanModal} onOk={handleCancel} onCancel={handleCancel} destroyOnClose>
      <Row>
        <Col span={24}>
          <div>paulo</div>
        </Col>
      </Row>
    </Modal>
  )
}

const { Content } = {
  Content: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 21px;
  `
}
