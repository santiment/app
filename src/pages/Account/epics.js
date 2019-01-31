import Raven from 'raven-js'
import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import * as actions from './actions'
import { showNotification } from './../../actions/rootActions'

const TELEGRAM_DEEP_LINK_QUERY = gql`
  {
    getTelegramDeepLink
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
            Observable.of(showNotification('Telgram deep link is generated'))
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
