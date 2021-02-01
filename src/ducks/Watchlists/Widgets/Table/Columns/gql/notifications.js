import { store } from '../../../../../../redux'
import { showNotification } from '../../../../../../actions/rootActions'

const dispatchNotification = payload =>
  store.dispatch(showNotification(payload))

export function notifyCreation (setTitle) {
  return dispatchNotification({
    variant: 'success',
    title: `"${setTitle}" set successfully created`
  })
}

export function notifyRename () {
  return dispatchNotification({
    variant: 'success',
    title: 'Your set successfully updated'
  })
}

export function notifyDelete (setTitle) {
  return dispatchNotification({
    variant: 'warning',
    title: `"${setTitle}" template has been deleted successfully`
  })
}

export function notifyError (description) {
  return dispatchNotification({
    variant: 'error',
    title: "Something's gone wrong",
    description
  })
}
