import type { GetServerSideProps } from 'next'
import { isAllowedChain } from '../../../ChainConfig'
import GetLiquidityTableData from '../../../components/get-liquidity/GetLiquidity'
import GetLiquidityHeader from '../../../components/get-liquidity/GetLiquidityHeader'
import { networkIdByName } from '../../../services/NetworkService'
import { DefaultPageTemplate } from '../../../shared/layout/DefaultPageTemplate'

interface HomeProps {
  network: string
}

function Home({ network }: HomeProps) {
  return (
    <DefaultPageTemplate network={network} pageHeaderTitle='Get liquidity' pageHeaderInit={<GetLiquidityHeader />}>
      <GetLiquidityTableData />
    </DefaultPageTemplate>
  )
}

export default Home

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
