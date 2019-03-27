/* eslint-env jasmine */
import { SHOW_NOTIFICATION } from './types'
import { showNotification } from './rootActions'

describe('Actions', () => {
  describe('Notification', () => {
    const expectedAction = {
      payload: {
        title: 'Any message'
      },
      type: SHOW_NOTIFICATION
    }

    const checkExpectedAction = newAction => {
      expect(newAction.payload.title).toBe(expectedAction.payload.title)
      expect(newAction.type).toBe(SHOW_NOTIFICATION)
    }

    it('Action can be made by the object with options', () => {
      const newAction = showNotification({
        title: 'Any message'
      })
      checkExpectedAction(newAction)
    })

    it('Action can be made by any message text', () => {
      const newAction = showNotification('Any message')
      checkExpectedAction(newAction)
    })
  })
})
