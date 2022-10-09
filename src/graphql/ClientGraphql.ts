import { ApolloClient, InMemoryCache } from '@apollo/client';



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
