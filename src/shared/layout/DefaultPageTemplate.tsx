import { Divider as AntDivider, Layout } from 'antd'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import Head from 'next/head'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { Footer } from './Footer'
import { Header } from './Header'
import { PageHeader, PageHeaderProps } from './PageHeader'

const { Content } = Layout

interface DefaultPageTemplateProps extends PageHeaderProps {
  network: string
  children: ReactNode
  skipMetaTags?: boolean
  pageHeaderInit?: ReactNode
  subtitle?: ReactNode
}

export function DefaultPageTemplate({
  children,
  network,
  skipMetaTags,
  pageHeaderProps,
  pageHeaderAfter,
  pageHeaderTitle,
  pageHeaderInit,
  subtitle
}: DefaultPageTemplateProps) {
  const items: ItemType[] = [
    {
      label: 'Get liquidity',
      key: `/[network]/get-liquidity`
    },
    {
      label: 'My loans',
      key: `/[network]/my-loans`
    },
    {
      label: 'Earn',
      key: `/[network]/earn`
    }
  ]

  return (
    <>
      {!skipMetaTags && (
        <Head>
          <title>Flex Loan</title>
          <meta property='title' content='Flex Loan' />
        </Head>
      )}
      <Layout>
        <Header network={network} title='Flex Loan' items={items} />
        <Divider />
        <Main>
          {!!pageHeaderInit && pageHeaderInit}
          <PageHeader
            subtitle={subtitle}
            pageHeaderTitle={pageHeaderTitle}
            pageHeaderAfter={pageHeaderAfter}
            pageHeaderProps={pageHeaderProps}
          />
          {children}
        </Main>
        <Footer />
      </Layout>
    </>
  )
}

const { Main, Divider } = {
  Main: styled(Content)`
    padding: 16px 24px;
    min-height: calc(100vh - 128px);
    max-width: calc(var(--screen-xl) - 48px);
    margin: 0 auto;
    width: 100%;
  `,
  Divider: styled(AntDivider)`
    margin: 0;
  `
}
