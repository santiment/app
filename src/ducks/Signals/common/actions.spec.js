/* eslint-env jasmine */
import { createTrigger } from './actions'

describe('Signals actions', () => {
  it('createTrigger should work', () => {
    const resultAction = createTrigger({
      target: 'santiment',
      percentThreshold: '5',
      cooldown: '1h',
      timeWindow: '24h',
      channels: ['Telegram'],
      title: 'Check',
      description: 'check'
    })
    expect(resultAction).toMatchSnapshot()
  })
})

describe('Signals ETH wallet actions', () => {
  it('createTrigger should work', () => {
    const resultAction = createTrigger({
      title: 'Signal_[6/25/2019]',
      description: 'Any D',
      isActive: true,
      isPublic: false,
      settings: {
        channel: 'telegram',
        percent_threshold: 200,
        threshold: 101,
        target: {
          address: '0x44fcfabfbe32024a01b778c025d70498382cced0'
        },
        asset: {
          slug: 'adx-net'
        },
        time_window: '24d',
        type: 'eth_wallet',
        operation: {
          amount_down: 101
        }
      },
      isRepeating: true,
      cooldown: '3d',
      shouldReload: false
    })
    expect(resultAction).toMatchSnapshot()
  })
})
