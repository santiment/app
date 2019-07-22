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
    .ofType(actions.ASSETS_TOGGLE_COLUMNS)
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
                type: actions.ASSETS_TOGGLE_COLUMNS_SAVE,
                payload: { hiddenColumns, sorting, pageSize, key }
              })
            }
          )
          .catch(
            handleErrorAndTriggerAction(
              actions.ASSETS_TOGGLE_COLUMNS_SAVE_FAILED
            )
          )
      }
      return Observable.of({
        type: actions.ASSETS_TOGGLE_COLUMNS_SAVE,
        payload: { hiddenColumns, key }
      })
    })

export const saveWatchlistsSettingsAfterLaunch = (action$, store, { client }) =>
  action$.ofType(actions.CHANGE_USER_DATA).mergeMap(() => {
    return Observable.from(
      client.watchQuery({ query: WATCHLISTS_SETTINGS_QUERY })
    )
      .concatMap(({ data: { fetchUserLists } }) => {
        return Observable.of({
          type: actions.ASSETS_SETTINGS_INITIALIZED_SUCCESS,
          payload: fetchUserLists
        })
      })
      .catch(
        handleErrorAndTriggerAction(actions.ASSETS_SETTINGS_INITIALIZED_FAILED)
      )
  })
