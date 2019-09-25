import { Observable } from 'rxjs'
import { ERC20_QUERY, WATCHLISTS_QUERY } from './queries'
import { handleErrorAndTriggerAction } from '../../epics/utils'
import * as actions from './actions'

const listItemToProjectMap = ({ project }) => project

const getAssets = data =>
  data.assets || data.watchlistBySlug.listItems.map(listItemToProjectMap)

const itemsReducer = (acc, { data }) => acc.concat(getAssets(data))

const Query = {
  erc20: ERC20_QUERY,
  defi: WATCHLISTS_QUERY,
  eos: WATCHLISTS_QUERY
}
const ALL_QUERIES = Object.keys(Query)

export const fetchMarketSegments = (action$, store, { client }) =>
  action$
    .ofType(actions.MARKET_SEGMENTS_FETCH)
    .switchMap(({ payload: { segment, forced = false } }) => {
      const slug = segment.toLowerCase()
      const queries = slug === 'all' ? ALL_QUERIES : [slug]
      const fetchPolicy = forced ? 'network-only' : 'cache-first'

      return Observable.forkJoin([
        Promise.resolve(forced),
        ...queries.map(slug =>
          client.query({
            query: Query[slug],
            variables: { slug },
            fetchPolicy
          })
        )
      ])
    })
    .mergeMap(([forced, ...items]) => {
      const payload = {
        assets: items.reduce(itemsReducer, [])
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
