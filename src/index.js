import './firstLogin' // NOTE: ENFORCING FIRST IMPORT ORDER
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { StripeProvider } from 'react-stripe-elements'
import throttle from 'lodash.throttle'
import { ApolloProvider } from 'react-apollo'
import Loadable from 'react-loadable'
import { startResponsiveController } from 'webkit/responsive'
import { ANON_EVENT } from 'webkit/ui/FollowButton/flow'
import Notifications from 'webkit/ui/Notifications'
import App from './App'
import { client } from './apollo'
import { store, history } from './redux'
import { saveState } from './utils/localStorage'
import { isNotSafari } from './utils/utils'
import detectNetwork from './utils/detectNetwork'
import { changeNetworkStatus, launchApp } from './actions/rootActions'
import { register, unregister } from './serviceWorker'
import { markAsLatestApp, newAppAvailable } from './ducks/Updates/actions'
import initSentry from './utils/initSentry'
import { redirectSharedLink } from './components/Share/utils'
import { SocketProvider } from './utils/socketHooks'
import 'webkit/styles/main.css'

startResponsiveController()

const APP_LINK = 'https://app.santiment.net'
window.__onLinkClick = (data) => {
  let href = data

  if (typeof data !== 'string') {
    data.preventDefault()

    const node = data.currentTarget
    href = node.getAttribute('href')
  }

  if (!href) return

  if (data && data.ctrlKey) {
    window.open(href, '_blank')
  } else if (href.includes(APP_LINK) || href.startsWith('/')) {
    history.push(href.replace('https://app.santiment.net', ''))
  } else {
    window.location.href = href
  }
}

const EmbeddedWidgetPage = Loadable({
  loader: () => import('./pages/Embedded'),
  loading: () => 'Loading',
})

const EmbeddedChartPage = Loadable({
  loader: () => import('./pages/Embedded/Chart'),
  loading: () => 'Loading',
})

redirectSharedLink()

const stripeKey =
  process.env.NODE_ENV === 'development' || window.location.host.includes('-stage')
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
        console.error('Cannot remove a child from a different parent', child, this)
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
          this,
        )
      }
      return newNode
    }
    return originalInsertBefore.apply(this, arguments)
  }
}

const main = () => {
  calculateHeight()

  window.addEventListener('resize', throttle(calculateHeight, 200))

  window.addEventListener(ANON_EVENT, () => {
    history.push('/login')
  })

  initSentry()

  store.subscribe(
    throttle(() => {
      saveState(store.getState().user)
    }, 1000),
  )

  store.dispatch(launchApp())

  detectNetwork(({ online = true }) => {
    store.dispatch(changeNetworkStatus(online))
  })

  if (isNotSafari()) {
    register({
      onUpdate: () => {
        store.dispatch(newAppAvailable())
      },
      markAsLatestApp: () => {
        store.dispatch(markAsLatestApp())
      },
    })
  } else {
    unregister()
  }

  new Notifications({ target: document.body })

  setTimeout(() => {
    ReactDOM.render(
      <StripeProvider apiKey={stripeKey}>
        <ApolloProvider client={client}>
          <SocketProvider>
            <Provider store={store}>
              <Router history={history}>
                <Switch>
                  <Route exact path='/__embedded' component={EmbeddedWidgetPage} />
                  <Route exact path='/__chart' component={EmbeddedChartPage} />
                  <Route path='/' component={App} history={history} />
                </Switch>
              </Router>
            </Provider>
          </SocketProvider>
        </ApolloProvider>
      </StripeProvider>,
      document.getElementById('root'),
    )
  }, 2000)
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
