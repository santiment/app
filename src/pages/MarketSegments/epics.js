import { Observable } from 'rxjs'
import { PROJECTS_QUERY } from './queries'
import { handleErrorAndTriggerAction } from '../../epics/utils'
import * as actions from './actions'

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
        })
      ])
    })
    .mergeMap(([forced, { data: { assets } }]) => {
      const payload = {
        assets
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
