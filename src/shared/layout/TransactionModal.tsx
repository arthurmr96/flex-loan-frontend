import { useReactiveVar } from '@apollo/client'
import { Modal, Spin, Typography } from 'antd'
import styled from 'styled-components'
import { transactionProcessingVar } from '../../graphql/variables/transactionVariable'

const { Text } = Typography

export function ModalTransaction() {
  const transactionProcessing = useReactiveVar(transactionProcessingVar)

  return (
    <Modal open={transactionProcessing} footer={null} closable={false} zIndex={10000}>
      <Container>
        <div>
          <Spin />
        </div>
        <Title>Processing Transaction</Title>
      </Container>
    </Modal>
  )
}

const { Container, Title } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
  `,
  Title: styled(Text)`
    color: var(--primary-color);
  `
}
