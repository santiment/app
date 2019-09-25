import Raven from 'raven-js'
import { Observable } from 'rxjs'
import { ERC20_QUERY, WATCHLISTS_QUERY } from './queries'
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
    .switchMap(({ payload }) => {
      const slug = payload.toLowerCase()
      const queries = slug === 'all' ? ALL_QUERIES : [slug]

      return Observable.forkJoin(
        queries.map(slug =>
          client.query({
            query: Query[slug],
            variables: { slug }
          })
        )
      )
    })
    .mergeMap(items => {
      console.log(items)
      const assets = items.reduce(itemsReducer, [])
      console.log(assets)

      return Observable.of({
        type: actions.MARKET_SEGMENTS_FETCH_SUCCESS,
        payload: assets
      })
    })
