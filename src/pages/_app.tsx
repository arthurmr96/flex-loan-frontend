import '../styles/global.less'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { subgraphClient } from '@graphql/ClientGraphql'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={subgraphClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
