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

export function notifyUpdate (type) {
  return dispatchNotification({
    variant: 'success',
    title: `Your ${type} has been updated successfully`
  })
}

export function notifyErrorUpdate () {
  return dispatchNotification({
    variant: 'error',
    title: 'Error during the saving screener process',
    dismissAfter: 5000
  })
}

export function notifyLoginForSave (history) {
  return dispatchNotification({
    variant: 'warning',
    title: `Log in to save your filter settings`,
    description:
      "Your settings will be lost after refresh if you're not logged in to Sanbase",
    dismissAfter: 8000,
    actions: [
      {
        label: 'Log in',
        onClick: () => history.push('/login')
      },
      {
        label: 'Create an account',
        onClick: () => history.push('/sign-up')
      }
    ]
  })
}

export function notifyOutdatedVersion () {
  return dispatchNotification({
    variant: 'warning',
    title: `Some filters don't present in your app version`,
    description: "Please, update version by 'CTRL/CMD + SHIFT+ R'",
    dismissAfter: 8000000,
    actions: [
      {
        label: 'Update now',
        onClick: () => window.location.reload(true)
      }
    ]
  })
}
