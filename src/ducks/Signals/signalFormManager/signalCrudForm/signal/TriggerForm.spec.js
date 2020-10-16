/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { TriggerForm } from './TriggerForm'
import { ETH_WALLET_METRIC } from '../../../utils/constants'
import { ApolloProvider } from 'react-apollo'
import { client } from '../../../../../apollo'

const allProjects = [
  {
    slug: 'santiment'
  }
]

describe('TriggerForm', () => {
  it('smoke', () => {
    const mockCb = jest.fn()
    const wrapper = shallow(
      <ApolloProvider client={client}>
        <TriggerForm
          data={allProjects}
          canRedirect={true}
          isTelegramConnected={true}
          onSettingsChange={mockCb}
          getSignalBacktestingPoints={() => {}}
        />
      </ApolloProvider>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})

describe('TriggerForm EthWallet', () => {
  it('smoke', () => {
    const mockCb = jest.fn()

    const asset = 'nuga'
    const address = 'some_custom_address'

    const wrapper = shallow(
      <ApolloProvider client={client}>
        <TriggerForm
          data={allProjects}
          canRedirect={true}
          isTelegramConnected={true}
          onSettingsChange={mockCb}
          getSignalBacktestingPoints={() => {}}
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
      </ApolloProvider>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
