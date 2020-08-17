import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { StripeProvider } from 'react-stripe-elements'
import throttle from 'lodash.throttle'
import { createHttpLink } from 'apollo-link-http'
import { from } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import { ConnectedRouter } from 'react-router-redux'
import App from './App'
import { client } from './apollo'
import { store } from './redux'
import reducers from './reducers/rootReducers.js'
import epics from './epics/rootEpics.js'
import { saveState } from './utils/localStorage'
import { getAPIUrl, isNotSafari } from './utils/utils'
import detectNetwork from './utils/detectNetwork'
import { changeNetworkStatus, launchApp } from './actions/rootActions'
import ChartPage from './pages/Chart'
import { register, unregister } from './serviceWorker'
import { markAsLatestApp, newAppAvailable } from './ducks/Updates/actions'
import { ThemeProvider } from './stores/ui/theme'
import './index.scss'

const stripeKey =
  process.env.NODE_ENV === 'development' ||
  window.location.host.includes('-stage')
    ? 'pk_test_gy9lndGDPXEFslDp8mJ24C3p'
    : 'pk_live_t7lOPOW79IIVcxjPPK5QfESD'

const calculateHeight = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

// NOTE: haritonasty: fix for crash when google translate is turn on
// https://github.com/facebook/react/issues/11538
if (typeof Node === 'function' && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      if (console) {
        console.error(
          'Cannot remove a child from a different parent',
          child,
          this
        )
      }
      return child
    }
    return originalRemoveChild.apply(this, arguments)
  }

  const originalInsertBefore = Node.prototype.insertBefore
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (console) {
        console.error(
          'Cannot insert before a reference node from a different parent',
          referenceNode,
          this
        )
      }
      return newNode
    }
    return originalInsertBefore.apply(this, arguments)
  }
}

const main = () => {
  const httpLink = createHttpLink({
    uri: `${getAPIUrl()}/graphql`,
    credentials: 'include'
  })

  calculateHeight()

  window.addEventListener('resize', throttle(calculateHeight, 200))

  store.subscribe(
    throttle(() => {
      saveState(store.getState().user)
    }, 1000)
  )

  store.dispatch(launchApp())

  detectNetwork(({ online = true }) => {
    store.dispatch(changeNetworkStatus(online))
  })

  if (isNotSafari) {
    register({
      onUpdate: () => {
        store.dispatch(newAppAvailable())
      },
      onSuccess: () => {
        store.dispatch(markAsLatestApp())
      }
    })
  } else {
    unregister()
  }

  ReactDOM.render(
    <StripeProvider apiKey={stripeKey}>
      <ApolloProvider client={client}>
        <ThemeProvider>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact path='/chart' component={ChartPage} />
                <Route path='/' component={App} />
              </Switch>
            </ConnectedRouter>
          </Provider>
        </ThemeProvider>
      </ApolloProvider>
    </StripeProvider>,
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
