/* eslint-env jest */
import React from 'react'
import { Provider } from 'react-redux'
import { shallow, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { ETH_WALLET_METRIC } from '../utils/constants'
import SignalMasterModalForm from './SignalMasterModalForm'

describe('SignalMasterModalForm', () => {
  it('smoke', () => {
    const asset = 'nuga'

    const address = 'some_custom_address'
    const store = {}

    const wrapper = shallow(
      <Provider store={store}>
        <SignalMasterModalForm
          canRedirect={false}
          metaFormSettings={{
            target: {
              value: {
                value: asset,
                label: asset
              }
            },
            metric: {
              value: { ...ETH_WALLET_METRIC }
            },
            type: {
              value: { ...ETH_WALLET_METRIC }
            },
            ethAddress: address
          }}
        />
      </Provider>
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
