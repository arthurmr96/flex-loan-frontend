import type { GetServerSideProps } from 'next'
import { networkIdByName } from '@services/NetworkService'
import { isAllowedChain } from '@config/chain'
import { Typography } from 'antd'
import { EarnContainer } from '@components/earn/EarnContainer'
import { DefaultPageTemplate } from '../../shared/layout/DefaultPageTemplate'

interface HomeProps {
  network: string
}

const { Title, Text } = Typography

function Earn({ network }: HomeProps) {
  return (
    <DefaultPageTemplate
      network={network}
      pageHeaderTitle={<Title level={3}>Earn</Title>}
      subtitle={<Text type='secondary'>Lend to earn yield up to 20% a year</Text>}
    >
      <EarnContainer />
    </DefaultPageTemplate>
  )
}

export default Earn

export const getServerSideProps: GetServerSideProps = async ctx => {
  const network = String(ctx.params?.network)
  const chainId = networkIdByName(network)

  if (!chainId || !isAllowedChain(chainId)) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      chainId,
      network
    }
  }
}
