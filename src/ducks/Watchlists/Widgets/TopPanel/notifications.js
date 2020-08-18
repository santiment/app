import { store } from '../../../../redux'
import { showNotification } from '../../../../actions/rootActions'

const dispatchNotification = payload =>
  store.dispatch(showNotification(payload))

export function notifyCreation () {
  return dispatchNotification({
    variant: 'success',
    title: 'Screener created',
    description: 'New screener has been created successfully.'
  })
}

export function notifyUpdate () {
  return dispatchNotification({
    variant: 'success',
    title: 'Screener update',
    description: 'Your screener has been updated successfully.'
  })
}
