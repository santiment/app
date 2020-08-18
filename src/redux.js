import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import { createEpicMiddleware } from 'redux-observable'
import createRavenMiddleware from 'raven-for-redux'
import { client } from './apollo'
import getRaven from './utils/getRaven'
import epics from './epics/rootEpics.js'
import reducers from './reducers/rootReducers.js'

export const history = createHistory()

const middleware = [
  createEpicMiddleware(epics, {
    dependencies: {
      client
    }
  }),
  routerMiddleware(history),
  createRavenMiddleware(getRaven())
]

export const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
)
