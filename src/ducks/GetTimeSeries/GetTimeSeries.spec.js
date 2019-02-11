/* eslint-env jest */
import React from 'react'
import toJson from 'enzyme-to-json'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import GetTimeSeries from './GetTimeSeries'

describe('GetTimeSeries', () => {
  const renderMock = jest.fn(({ timeseries }) => (
    <div id='flag'>{JSON.stringify(timeseries)}</div>
  ))
  const mockStore = configureStore([])
  let store

  beforeEach(() => {
    const initialState = {
      timeseries: {
        price: {
          isLoading: false,
          isError: false,
          items: []
        }
      }
    }
    store = mockStore(initialState)
  })

  const getWrapper = store =>
    mount(
      <GetTimeSeries
        price={{
          timeRange: '6m',
          slug: 'santiment',
          interval: '1d'
        }}
        devActivity={{
          from: '2018-12-01',
          to: '2018-12-10',
          slug: 'santiment',
          interval: '1d',
          transform: 'movingAverage',
          movingAverageIntervalBase: 7
        }}
        store={store}
        render={renderMock}
      />
    )

  it('should return history price list', async () => {
    const wrapper = getWrapper(store)
    expect(wrapper.find(GetTimeSeries).exists()).toBeTruthy()
    expect(store.getActions()).toMatchSnapshot()
  })
})
