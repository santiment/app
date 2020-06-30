import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { from } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import reducers from '../src/reducers/rootReducers.js'
import epics from '../src/epics/rootEpics.js'

import uploadLink from '../src/apollo/upload-link'
import errorLink from '../src/apollo/error-link'
import authLink from '../src/apollo/auth-link'
import retryLink from '../src/apollo/retry-link'

const httpLink = createHttpLink({
  uri: `https://api-stage.santiment.net/graphql`,
  credentials: 'include'
})
const client = new ApolloClient({
  link: from([authLink, errorLink, retryLink, uploadLink, httpLink]),
  shouldBatch: true,
  cache: new InMemoryCache()
})

const history = createHistory()

const middleware = [
  createEpicMiddleware(epics, {
    dependencies: {
      client
    }
  }),
  routerMiddleware(history)
]

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
