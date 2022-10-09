import { isAllowedChain } from '@config/chain'
import { networkIdByName } from '@services/NetworkService'
import { Typography } from 'antd'
import type { GetServerSideProps } from 'next'
import MyLeansContainer from '../../components/myLeans/myLeansContainer'
import { DefaultPageTemplate } from '../../shared/layout/DefaultPageTemplate'

interface HomeProps {
  network: string
}

const { Title } = Typography

function Earn({ network }: HomeProps) {
  return (
    <DefaultPageTemplate network={network} pageHeaderTitle={<Title level={3}>My Loans </Title>}>
      <MyLeansContainer />
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
