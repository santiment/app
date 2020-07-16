import { Observable } from 'rxjs'
import * as actions from '../../../../actions/types'
import { handleErrorAndTriggerAction } from '../../../../epics/utils'
import { WATCHLIST_MONITORED_MUTATION } from './watchlistMonitoredGQL'
import { WATCHLIST_QUERY } from '../../../../queries/WatchlistGQL'

export const watchlistToggleMonitoringEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.WATCHLIST_TOGGLE_MONITORING)
    .mergeMap(({ payload: { id, isMonitored } }) => {
      const watchlistUpdate = client.mutate({
        mutation: WATCHLIST_MONITORED_MUTATION,
        variables: { id: +id, isMonitored },
        update: (
          store,
          {
            data: {
              updateWatchlist: { isMonitored }
            }
          }
        ) => {
          const cache = store.readQuery({
            query: WATCHLIST_QUERY,
            variables: { id }
          })
          const updatedCache = {
            watchlist: { ...cache.watchlist, isMonitored }
          }
          store.writeQuery({
            query: WATCHLIST_QUERY,
            variables: { id },
            data: updatedCache
          })
        }
      })
      return Observable.from(watchlistUpdate)
        .mergeMap(() =>
          Observable.of({
            type: actions.WATCHLIST_TOGGLE_MONITORING_SUCCESS,
            payload: { id, isMonitored }
          })
        )
        .catch(
          handleErrorAndTriggerAction(
            actions.WATCHLIST_TOGGLE_MONITORING_FAILED
          )
        )
    })
