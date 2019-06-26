/* eslint-env jest */
import React from 'react'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import toJson, { shallowToJson } from 'enzyme-to-json'
import { SignalMaster } from './SignalMaster'
import configureStore from 'redux-mock-store'

describe('SignalMaster', () => {
  it('smoke', () => {
    const mockStore = configureStore([])
    const store = mockStore({})

    const wrapper = shallow(
      <Provider store={store}>
        <SignalMaster
          triggerId={247}
          setTitle={() => {}}
          onClose={() => {}}
          canRedirect={true}
        />
      </Provider>
    )

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
