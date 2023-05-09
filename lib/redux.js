import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import { client } from './apollo';
import epics from './epics/rootEpics.js';
import reducers from './reducers/rootReducers.js';
export const history = createBrowserHistory();
const middleware = [createEpicMiddleware(epics, {
  dependencies: {
    client
  }
}), routerMiddleware(history)];
export const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(...middleware)));