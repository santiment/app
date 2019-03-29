import { Observable } from 'rxjs'
import moment from 'moment'
import * as actions from './actions'
import { TOP_SOCIAL_GAINERS_LOSERS_GQL } from './gainersLosersGQL'

export const fetchGainersEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.FETCH_GAINERS_LOSERS)
    .switchMap(({ payload }) =>
      Observable.fromPromise(
        client.query({
          query: TOP_SOCIAL_GAINERS_LOSERS_GQL,
          variables: payload
        })
      )
    )
    .mergeMap(({ data: { topSocialGainersLosers } }) => {
      const topGainersDatetime = (topSocialGainersLosers || []).map(
        ({ datetime }) => moment(datetime)
      )
      const recentRecordTime = moment.max(topGainersDatetime)
      const { projects } =
        (topSocialGainersLosers || []).find(({ datetime }) =>
          moment(datetime).isSame(recentRecordTime)
        ) || {}

      return Observable.of({
        type: actions.FETCH_GAINERS_LOSERS_SUCCESS,
        payload: {
          gainersAndLosers: projects
        }
      })
    })
