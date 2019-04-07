import Raven from 'raven-js'
import { Observable } from 'rxjs'
import gql from 'graphql-tag'
import * as actions from './actions'

const allTickersSlugsGQL = gql`
  query allProjects {
    allProjects {
      ticker
      slug
      name
    }
  }
`

const handleError = error => {
  Raven.captureException(error)
  return Observable.of({
    type: actions.TRENDS_HYPED_FETCH_TICKERS_SLUGS_FAILED,
    payload: error
  })
}

export default (action$, store, { client }) =>
  action$
    .ofType(actions.TRENDS_HYPED_FETCH_TICKERS_SLUGS)
    .switchMap(({ data = {} }) => {
      return Observable.from(
        client.query({
          query: allTickersSlugsGQL,
          context: { isRetriable: true }
        })
      )
        .exhaustMap(({ data = {} }) => {
          return Observable.of({
            type: actions.TRENDS_HYPED_FETCH_TICKERS_SLUGS_SUCCESS,
            payload: {
              allAssets: data.allProjects || []
            }
          })
        })
        .catch(handleError)
    })
