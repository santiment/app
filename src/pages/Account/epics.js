import Raven from 'raven-js'
import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import * as actions from './actions'
import { userGQL } from './../../epics/handleLaunch'
import { showNotification } from './../../actions/rootActions'

const TELEGRAM_DEEP_LINK_QUERY = gql`
  {
    getTelegramDeepLink
  }
`

const SETTINGS_TOGGLE_CHANNEL_QUERY = gql`
  mutation settingsToggleChannel(
    $signal_notify_email: Boolean
    $signal_notify_telegram: Boolean
  ) {
    settingsToggleChannel(
      signal_notify_email: $signal_notify_email
      signal_notify_telegram: $signal_notify_telegram
    ) {
      signalNotifyEmail
    }
  }
`

export const generateTelegramDeepLinkEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.SETTINGS_GENERATE_TELEGRAM_DEEP_LINK)
    .switchMap(action => {
      const getTelegramDeepLink = client.query({
        query: TELEGRAM_DEEP_LINK_QUERY,
        context: { isRetriable: true }
      })
      return Observable.from(getTelegramDeepLink)
        .mergeMap(({ data }) => {
          return Observable.merge(
            Observable.of({
              type: actions.SETTINGS_GENERATE_TELEGRAM_DEEP_LINK_SUCCESS,
              payload: {
                link: data.getTelegramDeepLink
              }
            }),
            Observable.of(showNotification('Telegram deep link is generated'))
          )
        })
        .catch(error => {
          Raven.captureException(error)
          return Observable.of({
            type: actions.SETTINGS_GENERATE_TELEGRAM_DEEP_LINK_FAILED,
            payload: error
          })
        })
    })

export const toggleNotificationChannelEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.SETTINGS_TOGGLE_NOTIFICATION_CHANNEL)
    .switchMap(action => {
      console.log('req: ', action)
      const toggleNotificationChannel = client.mutate({
        mutation: SETTINGS_TOGGLE_CHANNEL_QUERY,
        variables: {
          ...action.payload
        },
        update: proxy => {
          let data = proxy.readQuery({ query: userGQL })
          data.currentUser.settings = {
            ...data.currentUser.settings,
            ...action.payload
          }
          console.log(data)
          proxy.writeQuery({ query: userGQL, data })
        },
        context: { isRetriable: true }
      })
      return Observable.from(toggleNotificationChannel)
        .mergeMap(({ data }) => {
          console.log(data)
          return Observable.merge(
            Observable.of({
              type: actions.SETTINGS_TOGGLE_NOTIFICATION_CHANNEL_SUCCESS,
              payload: {
                email: data.settingsToggleChannel.signalNotifyEmail,
                telegram: data.settingsToggleChannel.signalNotifyTelegram
              }
            }),
            Observable.of(showNotification('Notification channel is toggled'))
          )
        })
        .catch(error => {
          Raven.captureException(error)
          return Observable.of({
            type: actions.SETTINGS_TOGGLE_NOTIFICATION_CHANNEL_FAILED,
            payload: error
          })
        })
    })
