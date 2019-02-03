/* eslint-env jest */
import { ApolloClient } from 'apollo-client'
import { MockLink, mockSingleLink } from 'react-apollo/test-utils'
import { ApolloLink, Observable } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ActionsObservable } from 'redux-observable'
import { connectTelegramEpic, USER_SETTINGS_TELEGRAM_QUERY } from './epics'
import * as actions from './../../actions/types'
import configureStore from 'redux-mock-store'
const mockStore = configureStore([])

const query = USER_SETTINGS_TELEGRAM_QUERY

const result = {
  currentUser: {
    id: 2,
    settings: {
      hasTelegramConnected: false
    }
  }
}

const resultSuccess = {
  currentUser: {
    id: 2,
    settings: {
      hasTelegramConnected: true
    }
  }
}

const link = mockSingleLink(
  { request: { query, variables: {} }, result: { data: result } },
  { request: { query, variables: {} }, result: { data: resultSuccess } },
  { request: { query, variables: {} }, result: { data: resultSuccess } }
)

const falseLink = mockSingleLink(
  { request: { query, variables: {} }, result: { data: result } },
  { request: { query, variables: {} }, result: { data: result } },
  { request: { query, variables: {} }, result: { data: result } },
  { request: { query, variables: {} }, result: { data: result } },
  { request: { query, variables: {} }, result: { data: result } },
  { request: { query, variables: {} }, result: { data: result } },
  { request: { query, variables: {} }, result: { data: result } },
  { request: { query, variables: {} }, result: { data: result } },
  { request: { query, variables: {} }, result: { data: result } },
  { request: { query, variables: {} }, result: { data: result } },
  { request: { query, variables: {} }, result: { data: result } },
  { request: { query, variables: {} }, result: { data: result } },
  { request: { query, variables: {} }, result: { data: result } },
  { request: { query, variables: {} }, result: { data: result } }
)

const createClient = link => {
  return new ApolloClient({
    link,
    cache: new InMemoryCache({
      addTypename: false
    })
  })
}

describe('connect to telegram', () => {
  it('should return connection succesfull, if server return the true flag', async () => {
    const client = createClient(link)
    const action$ = ActionsObservable.of({
      type: actions.SETTINGS_CONNECT_TELEGRAM
    })
    const epic$ = connectTelegramEpic(action$, mockStore({}), { client })
    jest.useFakeTimers()
    const promise = epic$.toArray().toPromise()
    jest.runAllTimers()
    const result = await promise
    expect(result[0]).toEqual({
      type: actions.SETTINGS_CONNECT_TELEGRAM_SUCCESS
    })
  }, 30000)

  it('should return connection cancel, if we fire cancel action', async () => {
    const client = createClient(link)
    const action$ = ActionsObservable.of(
      {
        type: actions.SETTINGS_CONNECT_TELEGRAM
      },
      {
        type: actions.SETTINGS_CONNECT_TELEGRAM_CANCEL
      }
    )
    const epic$ = connectTelegramEpic(action$, mockStore({}), { client })
    jest.useFakeTimers()
    const promise = epic$.toArray().toPromise()
    jest.runAllTimers()
    const result = await promise
    expect(result[0]).toEqual({
      type: actions.SETTINGS_CONNECT_TELEGRAM_CANCEL
    })
  }, 30000)
})
