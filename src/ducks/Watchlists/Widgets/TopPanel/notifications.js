import { store, history } from '../../../../redux'
import { showNotification } from '../../../../actions/rootActions'

const ARR = []

const dispatchNotification = payload =>
  store.dispatch(showNotification(payload))

export const notifyCreation = (title, link) =>
  dispatchNotification({
    variant: 'success',
    title: `New ${title} was created`,
    description: !link && `New ${title} has been created successfully.`,
    actions: link
      ? [{ label: 'Open', onClick: () => history.push(link) }]
      : ARR,
    dismissAfter: link ? 7000 : 4000
  })

export const notifyError = (title, action) =>
  dispatchNotification({
    variant: 'error',
    title: `Couldn't ${action} the ${title}. Please, contact our support`,
    dismissAfter: 5000
  })

export const notifyDeletion = name =>
  dispatchNotification({
    variant: 'success',
    title: `“${name}” have been deleted successfully`
  })

export function notifyUpdate (title) {
  return dispatchNotification({
    variant: 'success',
    title: `Your ${title} has been updated successfully`
  })
}

export function notifyLoginForSave () {
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

// NOTE: move to edit mutation [haritonasty 09.03.2021]
export function notifyMonitoring ({ type = 'watchlist', name, isMonitored }) {
  return dispatchNotification({
    variant: 'success',
    title: isMonitored
      ? `You are monitoring "${name}" ${type} now`
      : `You won't receive reports with "${name}" ${type}`
  })
}
