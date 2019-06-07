import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import createRavenMiddleware from 'raven-for-redux'
import throttle from 'lodash.throttle'
import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { from } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import mixpanelHelper from 'react-ab-test/lib/helpers/mixpanel'
import emitter from 'react-ab-test/lib/emitter'
import App from './App'
import reducers from './reducers/rootReducers.js'
import epics from './epics/rootEpics.js'
import { loadState, saveState } from './utils/localStorage'
import { getAPIUrl } from './utils/utils'
import detectNetwork from './utils/detectNetwork'
import getRaven from './utils/getRaven'
import { changeNetworkStatus, launchApp } from './actions/rootActions'
import uploadLink from './apollo/upload-link'
import errorLink from './apollo/error-link'
import authLink from './apollo/auth-link'
import retryLink from './apollo/retry-link'
import ChartPage from './ducks/SANCharts/ChartPage'
import { unregister } from './serviceWorker'
import './index.scss'

// window.mixpanel has been set by Mixpanel's embed snippet.
mixpanelHelper.enable()

// Called when the experiment is displayed to the user.
emitter.addPlayListener((experiment, variant) => {
  window.mixpanel.track('Experiment Play', {
    experiment,
    variant
  })
})

// Called when a 'win' is emitted, in this case by this.refs.experiment.win()
emitter.addWinListener((experiment, variant) => {
  window.mixpanel.track('Experiment Win', { experiment, variant })
})

export let client
export let store

const main = () => {
  const httpLink = createHttpLink({
    uri: `${getAPIUrl()}/graphql`,
    credentials: 'include'
  })
  client = new ApolloClient({
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
    routerMiddleware(history),
    createRavenMiddleware(getRaven())
  ]

  store = createStore(
    reducers,
    { user: loadState() } || {},
    composeWithDevTools(applyMiddleware(...middleware))
  )

  store.subscribe(
    throttle(() => {
      saveState(store.getState().user)
    }, 1000)
  )

  store.dispatch(launchApp())

  detectNetwork(({ online = true }) => {
    store.dispatch(changeNetworkStatus(online))
  })

  unregister()

  ReactDOM.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path='/chart' component={ChartPage} />
            <Route path='/' component={App} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    </ApolloProvider>,
    document.getElementById('root')
  )
}

if (process.env.NODE_ENV === 'development') {
  const { whyDidYouUpdate } = require('why-did-you-update')
  if (process.env.REACT_APP_DEBUG) {
    whyDidYouUpdate(React)
  }
  main()
} else {
  const script = document.createElement('script')
  script.src = `/env.js?${process.env.REACT_APP_VERSION}`
  script.async = false
  document.body.appendChild(script)
  script.addEventListener('load', main)
}
