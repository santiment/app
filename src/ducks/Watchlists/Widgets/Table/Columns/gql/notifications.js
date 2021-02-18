import { store } from '../../../../../../redux'
import { showNotification } from '../../../../../../actions/rootActions'

const dispatchNotification = payload =>
  store.dispatch(showNotification(payload))

export function notifyCreation (title) {
  return dispatchNotification({
    variant: 'success',
    title: `"${title}" set has been created successfully`
  })
}

export function notifyUpdate (title) {
  return dispatchNotification({
    variant: 'success',
    title: `"${title}" set has been updated successfully`
  })
}

export function notifyDelete (title) {
  return dispatchNotification({
    variant: 'warning',
    title: `"${title}" set has been deleted successfully`
  })
}

export function notifyError (description) {
  return dispatchNotification({
    variant: 'error',
    title: "Something's gone wrong",
    description
  })
}
