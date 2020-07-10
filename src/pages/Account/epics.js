import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import { USER_EMAIL_LOGIN_QEURY } from './../../epics/handleLaunch'
import { handleErrorAndTriggerAction } from './../../epics/utils'
import { showNotification } from './../../actions/rootActions'
import * as actions from './../../actions/types'
import { updateUserSettings } from '../../contexts/user/settings'

const TELEGRAM_DEEP_LINK_QUERY = gql`
  {
    getTelegramDeepLink
  }
`

export const USER_SETTINGS_TELEGRAM_QUERY = gql`
  {
    currentUser {
      id
      settings {
        hasTelegramConnected
      }
    }
  }
`

const TELEGRAM_DEEP_LINK_REVOKE_QUERY = gql`
  mutation {
    revokeTelegramDeepLink
  }
`

const SETTINGS_TOGGLE_CHANNEL_QUERY = gql`
  mutation settingsToggleChannel(
    $signalNotifyEmail: Boolean
    $signalNotifyTelegram: Boolean
  ) {
    settingsToggleChannel(
      signalNotifyEmail: $signalNotifyEmail
      signalNotifyTelegram: $signalNotifyTelegram
    ) {
      signalNotifyEmail
      signalNotifyTelegram
    }
  }
`

export const TIMEOUT_DELAY = 25000

export const connectTelegramEpic = (action$, store, { client }) =>
  action$.ofType(actions.SETTINGS_CONNECT_TELEGRAM).mergeMap(action => {
    const telegramConnection$ = Observable.from(
      client.watchQuery({
        query: USER_SETTINGS_TELEGRAM_QUERY,
        pollInterval: 2000
      })
    )
      .takeUntil(action$.ofType(actions.SETTINGS_CONNECT_TELEGRAM_CANCEL))
      .filter(({ data }) => {
        return (data.currentUser.settings || {}).hasTelegramConnected
      })
      .mergeMap(({ data }) => {
        return Observable.merge(
          Observable.of({ type: actions.SETTINGS_CONNECT_TELEGRAM_SUCCESS }),
          Observable.of(showNotification('Telegram is connected'))
        )
      })
      .take(1)
    const timeout$ = Observable.timer(TIMEOUT_DELAY)
      .takeUntil(action$.ofType(actions.SETTINGS_CONNECT_TELEGRAM_SUCCESS))
      .mapTo({ type: actions.SETTINGS_CONNECT_TELEGRAM_CANCEL })
    return Observable.merge(telegramConnection$, timeout$)
  })

export const revokeTelegramDeepLinkEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.SETTINGS_REVOKE_TELEGRAM_DEEP_LINK)
    .switchMap(action => {
      return Observable.from(
        client.mutate({
          mutation: TELEGRAM_DEEP_LINK_REVOKE_QUERY,
          context: { isRetriable: true }
        })
      ).mergeMap(({ data }) => {
        return Observable.merge(
          Observable.of({
            type: actions.SETTINGS_REVOKE_TELEGRAM_DEEP_LINK_SUCCESS
          }),
          Observable.of(showNotification('Telegram deep link is revoked'))
        )
      })
    })

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
          return Observable.of({
            type: actions.SETTINGS_GENERATE_TELEGRAM_DEEP_LINK_SUCCESS,
            payload: {
              link: data.getTelegramDeepLink
            }
          })
        })
        .catch(error => {
          handleErrorAndTriggerAction(
            actions.SETTINGS_GENERATE_TELEGRAM_DEEP_LINK_FAILED
          )
        })
    })

function tryUpdateUserProxyData (proxy, query, action) {
  try {
    let data = proxy.readQuery({ query })

    updateUserSettings(action.payload)
    data.currentUser.settings = {
      ...data.currentUser.settings,
      ...action.payload
    }

    proxy.writeQuery({ query, data })
  } catch (e) {
    // pass
  }
}

export const toggleNotificationChannelEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.SETTINGS_TOGGLE_NOTIFICATION_CHANNEL)
    .switchMap(action => {
      const toggleNotificationChannel = client.mutate({
        mutation: SETTINGS_TOGGLE_CHANNEL_QUERY,
        variables: {
          ...action.payload
        },
        optimisticResponse: {
          __typename: 'Mutation',
          settingsToggleChannel: {
            __typename: 'UserSettings',
            signalNotifyEmail: false,
            signalNotifyTelegram: false,
            ...action.payload
          }
        },
        update: proxy => {
          tryUpdateUserProxyData(proxy, USER_EMAIL_LOGIN_QEURY, action)
        },
        context: { isRetriable: true }
      })
      return Observable.from(toggleNotificationChannel)
        .mergeMap(({ data }) => {
          return Observable.merge(
            Observable.of({
              type: actions.SETTINGS_TOGGLE_NOTIFICATION_CHANNEL_SUCCESS,
              payload: {
                signalNotifyEmail: data.settingsToggleChannel.signalNotifyEmail,
                signalNotifyTelegram:
                  data.settingsToggleChannel.signalNotifyTelegram
              }
            }),
            Observable.of(
              showNotification('Notification channel settings is changed')
            )
          )
        })
        .catch(
          handleErrorAndTriggerAction(
            actions.SETTINGS_TOGGLE_NOTIFICATION_CHANNEL_FAILED
          )
        )
    })
