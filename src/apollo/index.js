import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import uploadLink from './upload-link'
import errorLink from './error-link'
import authLink from './auth-link'
import retryLink from './retry-link'

export const client = new ApolloClient({
  link: from([authLink, errorLink, retryLink, uploadLink, httpLink]),
  shouldBatch: true,
  cache: new InMemoryCache()
})
