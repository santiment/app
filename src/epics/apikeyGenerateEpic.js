import * as Sentry from '@sentry/react'
import { Observable } from 'rxjs'
import gql from 'graphql-tag'
import {
  USER_APIKEY_GENERATE,
  USER_APIKEY_GENERATE_SUCCESS
} from './../actions/types'

const GENERATE_API_KEY_MUTATION = gql`
  mutation {
    generateApikey {
      apikeys
    }
  }
`

const apikeyGenerateEpic = (action$, store, { client }) =>
  action$
    .ofType(USER_APIKEY_GENERATE)
    .debounceTime(200)
    .switchMap(() => {
      const mutation = client.mutate({
        mutation: GENERATE_API_KEY_MUTATION
      })
      return Observable.from(mutation)
        .mergeMap(({ data: { generateApikey } }) =>
          Observable.of({
            type: USER_APIKEY_GENERATE_SUCCESS,
            apikeys: generateApikey.apikeys
          })
        )
        .catch(error => {
          Sentry.captureException(error)
          return Observable.of({
            type: 'USER_APIKEY_GENERATE_FAIL',
            payload: error
          })
        })
    })

export default apikeyGenerateEpic
