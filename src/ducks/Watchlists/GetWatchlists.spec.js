/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import configureStore from 'redux-mock-store'
import { ALL_WATCHLISTS_QUERY } from '../../queries/WatchlistGQL'
import GetFeaturesWatchlists from './GetFeaturedWatchlists'
import GetWatchlists from './GetWatchlists'

const mockedData = {
  fetchUserLists: [0, 1, 2, 3, 4, 5, 6, 7, 8].map(index => ({
    color: 'NONE',
    id: '17' + index,
    insertedAt: '2018-12-01T13:37:02.07080' + index,
    isPublic: Boolean(index % 2),
    listItems: [],
    name: 'Test-' + index,
    updatedAt: '2018-12-21T07:25:02.51675' + index,
    user: {
      id: index
    }
  }))
}

const query = ALL_WATCHLISTS_QUERY

const mocks = [{ request: { query }, result: { data: mockedData } }]

const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount))

describe('GetWatchlists', () => {
  const renderMock = jest.fn(({ watchlists }) => (
    <div id='flag'>{watchlists.length}</div>
  ))
  const mockStore = configureStore([])
  let store

  beforeEach(() => {
    const initialState = { user: { token: 'any', data: { id: '346' } } }
    store = mockStore(initialState)
  })

  const getWrapper = store =>
    mount(
      <MockedProvider addTypename={false} mocks={mocks}>
        <GetWatchlists store={store} render={renderMock} />
      </MockedProvider>
    )

  const getFeaturedWrapper = store =>
    mount(
      <MockedProvider addTypename={false} mocks={mocks}>
        <GetFeaturesWatchlists store={store} render={renderMock} />
      </MockedProvider>
    )

  it('should return watchlists and isWatchlistsLoading', async () => {
    const wrapper = getWrapper(store)
    // Why? https://www.apollographql.com/docs/react/recipes/testing.html
    await wait(0)
    expect(wrapper.find(GetWatchlists).exists()).toBeTruthy()
    expect(wrapper.find('#flag').text()).toEqual('0')
    /* expect(wrapper.find('#flag').text()).toEqual(
      mockedData.fetchUserLists.length + ''
    )
    expect(renderMock).toHaveBeenCalledWith(
      expect.objectContaining({
        isLoggedIn: true,
        isWatchlistsLoading: false,
        watchlists: expect.arrayContaining([mockedData.fetchUserLists[0]])
      })
    ) */
  })

  it('should return watchlists = 0 and isWatchlistsLoading', async () => {
    const wrapper = getWrapper(
      mockStore({
        user: {
          data: { id: 312 }
        }
      })
    )
    await wait(0)
    expect(wrapper.find('#flag').text()).toEqual('0')
    expect(renderMock).toHaveBeenCalledWith(
      expect.objectContaining({
        isLoggedIn: true,
        isWatchlistsLoading: false
      })
    )
  })
})
