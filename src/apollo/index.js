import ApolloClient from 'apollo-client'
import { from } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import uploadLink from './upload-link'
import errorLink from './error-link'
import authLink from './auth-link'
import retryLink from './retry-link'
import { getAPIUrl } from '../utils/utils'

const httpLink = createHttpLink({
  uri: `${getAPIUrl()}/graphql`,
  credentials: 'include'
})

export const client = new ApolloClient({
  link: from([authLink, errorLink, retryLink, uploadLink, httpLink]),
  shouldBatch: true,
  cache: new InMemoryCache()
})
