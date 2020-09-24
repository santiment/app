import * as Sentry from '@sentry/react'
import { Observable } from 'rxjs'
import gql from 'graphql-tag'
import * as actions from './actions'

const allTickersSlugsGQL = gql`
  query allProjects($minVolume: Int!) {
    allProjects(minVolume: $minVolume) {
      ticker
      slug
      name
    }
  }
`

const handleError = error => {
  Sentry.captureException(error)
  return Observable.of({
    type: actions.TRENDS_HYPED_FETCH_TICKERS_SLUGS_FAILED,
    payload: error
  })
}

export default (action$, store, { client }) =>
  action$
    .ofType(actions.TRENDS_HYPED_FETCH_TICKERS_SLUGS)
    .exhaustMap(({ data = {} }) => {
      return Observable.from(
        client.query({
          query: allTickersSlugsGQL,
          variables: { minVolume: 0 },
          context: { isRetriable: true }
        })
      )
        .flatMap(({ data = {} }) => {
          return Observable.of({
            type: actions.TRENDS_HYPED_FETCH_TICKERS_SLUGS_SUCCESS,
            payload: {
              allAssets: data.allProjects || []
            }
          })
        })
        .catch(handleError)
    })
