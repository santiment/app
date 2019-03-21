/* eslint-env jest */
import { selectIsTelegramConnected } from './UserSelectors'

describe('User Selectors', () => {
  it('selectIsTelegramConnected should be falsy', () => {
    const state = {
      user: {
        data: {},
        isLoading: false,
        token: null
      }
    }
    expect(selectIsTelegramConnected(state)).toBeFalsy()
  })

  it('selectIsTelegramConnected should be true', () => {
    const state = {
      user: {
        data: {
          settings: {
            hasTelegramConnected: true,
            signalNotifyTelegram: true
          }
        }
      }
    }
    expect(selectIsTelegramConnected(state)).toBeTruthy()
  })
})
