import { Observable } from 'rxjs'
import { DEV_ACTIVITY_CHANGE_QUERY, PROJECTS_QUERY } from './queries'
import { handleErrorAndTriggerAction } from '../../epics/utils'
import * as actions from './actions'
import { addDays } from '../../utils/dates'

const getFunction = segment =>
  `{"name": "market_segments", "args":{"market_segments": [ "${segment}" ]}}`

const Fn = {
  Ethereum: getFunction('Ethereum'),
  DeFi: getFunction('DeFi'),
  EOS: getFunction('EOS')
}

export const fetchMarketSegments = (action$, store, { client }) =>
  action$
    .ofType(actions.MARKET_SEGMENTS_FETCH)
    .switchMap(({ payload: { segment, forced = false } }) => {
      const fetchPolicy = forced ? 'network-only' : 'cache-first'

      return Observable.forkJoin([
        Promise.resolve(forced),
        client.query({
          query: PROJECTS_QUERY,
          variables: { fn: Fn[segment] },
          fetchPolicy
        }),
        client.query({
          query: DEV_ACTIVITY_CHANGE_QUERY,
          variables: {
            from: addDays(new Date(), -30).toISOString(),
            to: new Date().toISOString()
          },
          fetchPolicy
        })
      ])
    })
    .mergeMap(([forced, { data: { assets } }, { data: { allProjects } }]) => {
      const activityChangeMapping = allProjects.reduce((acc, item) => {
        acc[item.slug] = item
        return acc
      }, {})

      const payload = {
        assets: assets.map(asset => {
          if (!activityChangeMapping[asset.slug]) {
            return asset
          }

          return {
            ...asset,
            devActChange30d:
              activityChangeMapping[asset.slug].dev_activity_change_30d
          }
        })
      }
      if (forced) {
        payload.timestamp = Date.now()
      }

      return Observable.of({
        type: actions.MARKET_SEGMENTS_FETCH_SUCCESS,
        payload
      })
    })
    .catch(handleErrorAndTriggerAction(actions.MARKET_SEGMENTS_FETCH_FAIL))
