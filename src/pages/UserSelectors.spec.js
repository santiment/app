/* eslint-env jest */
import { isTelegramConnectedAndEnabled } from './UserSelectors'

describe('User Selectors', () => {
  it('selectIsTelegramConnected should be falsy', () => {
    const state = {
      user: {
        data: {},
        isLoading: false,
        token: null
      }
    }
    expect(isTelegramConnectedAndEnabled(state)).toBeFalsy()
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
    expect(isTelegramConnectedAndEnabled(state)).toBeTruthy()
  })
})
