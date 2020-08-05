import { push } from 'react-router-redux'
import { store } from '../../../../index'
import { showNotification } from '../../../../actions/rootActions'

const SCHEDULED_COMMENT = 'SCHEDULED_COMMENT'

const dispatchNotification = payload =>
  store.dispatch(showNotification(payload))

export function saveComment (insightId, content) {
  localStorage.setItem(
    SCHEDULED_COMMENT,
    `https://insights.santiment.net/read/${insightId}?comment=${content}&_wc=1#comments`
  )

  dispatchNotification({
    title: 'Your comment was saved and will be posted after sign up'
  })

  return store.dispatch(push('/login'))
}

export function clearSavedComment () {
  localStorage.removeItem(SCHEDULED_COMMENT)
}

export function lookupSavedComment () {
  const href = localStorage.getItem(SCHEDULED_COMMENT)

  if (!href) return

  dispatchNotification({
    title: 'You have unposted comment',
    dismissAfter: 999999,
    actions: [
      {
        label: 'View and edit',
        onClick: () => {
          clearSavedComment()
          window.location.href = href
        }
      }
    ]
  })
}
