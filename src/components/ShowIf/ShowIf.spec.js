/* eslint-env jest */
import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import ShowIf from './ShowIf'
import configureStore from 'redux-mock-store'

const AnyComponent = () => 'Check'

describe('ShowIf', () => {
  const mockStore = configureStore([])
  let store

  beforeEach(() => {
    const initialState = {
      user: {
        data: {
          sanBalance: 400
        }
      },
      rootUi: { isBetaModeEnabled: true }
    }
    store = mockStore(initialState)
  })

  const getWrapper = store =>
    mount(
      <ShowIf beta store={store}>
        <AnyComponent />
      </ShowIf>
    )

  it('it should render if beta', () => {
    const wrapper = getWrapper(store)
    expect(wrapper.find(AnyComponent).exists()).toBeTruthy()
  })

  it('it should render empty if is not beta', () => {
    store = mockStore({ rootUi: { isBetaModeEnabled: false } })
    const wrapper = getWrapper(store)
    expect(wrapper.find(AnyComponent).exists()).toBeFalsy()
  })

  it('it should render if loggedIn', () => {
    store = mockStore({ user: { token: 'any', data: { id: '455' } } })
    const wrapper = mount(
      <ShowIf loggedIn store={store}>
        <AnyComponent />
      </ShowIf>
    )
    expect(wrapper.find(AnyComponent).exists()).toBeTruthy()
  })
})
