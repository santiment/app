import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import { saveKeyState } from '../utils/localStorage'
import * as actions from './../actions/types'
import { WATCHLISTS_SETTINGS_QUERY } from '../queries/WatchlistGQL'
import { handleErrorAndTriggerAction } from './utils'

const WATCHLIST_SETTINGS_MUTATION = gql`
  mutation updateWatchlistSettings(
    $id: Int!
    $pageSize: Int
    $tableColumns: json
  ) {
    updateWatchlistSettings(
      id: $id
      settings: { pageSize: $pageSize, tableColumns: $tableColumns }
    ) {
      pageSize
      tableColumns
    }
  }
`

export const changeColumnsSettingsEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.WATCHLIST_TOGGLE_COLUMNS)
    .switchMap(({ payload: { hiddenColumns, listId, listName } }) => {
      const key = listId || listName
      const allSettings = store.getState().watchlistUi.watchlistsSettings || {}
      const listSettings = allSettings[key] || {}
      saveKeyState('watchlistsSettings', {
        ...allSettings,
        [key]: { ...listSettings, hiddenColumns }
      })
      const { data } = store.getState().user
      if (listId && data && data.id) {
        const mutation = client.mutate({
          mutation: WATCHLIST_SETTINGS_MUTATION,
          variables: {
            id: parseInt(key),
            tableColumns: `{"hiddenColumns": ${JSON.stringify(hiddenColumns)}}`
          }
        })
        return Observable.from(mutation)
          .mergeMap(
            ({
              data: {
                updateWatchlistSettings: {
                  tableColumns: { hiddenColumns, sorting },
                  pageSize
                }
              }
            }) => {
              return Observable.of({
                type: actions.WATCHLIST_SETTINGS_SAVE_SUCCESS,
                payload: { hiddenColumns, sorting, pageSize, key }
              })
            }
          )
          .catch(
            handleErrorAndTriggerAction(actions.WATCHLIST_SETTINGS_SAVE_FAILED)
          )
      }
      return Observable.of({
        type: actions.WATCHLIST_SETTINGS_SAVE_SUCCESS,
        payload: { hiddenColumns, key }
      })
    })

export const saveWatchlistsSettingsAfterLaunch = (action$, store, { client }) =>
  action$.ofType(actions.CHANGE_USER_DATA).mergeMap(() => {
    return Observable.from(
      client.watchQuery({ query: WATCHLISTS_SETTINGS_QUERY })
    )
      .concatMap(({ data: { fetchWatchlists } }) => {
        const normalizedSettings = {}
        fetchWatchlists.forEach(
          ({
            id,
            settings: {
              tableColumns: { hiddenColumns, sorting },
              pageSize
            }
          }) => {
            normalizedSettings[id] = { pageSize, hiddenColumns, sorting }
          }
        )
        return Observable.of({
          type: actions.WATCHLISTS_SETTINGS_FETCH_SUCCESS,
          payload: normalizedSettings
        })
      })
      .catch(
        handleErrorAndTriggerAction(actions.WATCHLISTS_SETTINGS_FETCH_FAILED)
      )
  })
