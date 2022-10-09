import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

export const subgraphClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://api.thegraph.com/subgraphs/name/arthurmr96/flex-loan',
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/arthurmr96/flex-loan'
  })
})

export const graphqlClient = (uri: string) => {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {}
      }
    }
  })

  return new ApolloClient({
    uri,
    cache
  })
}
