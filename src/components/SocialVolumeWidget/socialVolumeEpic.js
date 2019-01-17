import { Observable } from 'rxjs'
import moment from 'moment'
import * as actions from './actions'
import { socialVolumeGQL } from './socialVolumeGQL'
import { handleErrorAndTriggerAction } from '../../epics/utils'

export const fetchSocialVolumeEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.SOCIALVOLUME_DATA_FETCH)
    .switchMap(({ payload: slug }) => {
      if (store.getState().socialVolume.slug === slug) {
        return Observable.of({
          type: actions.SOCIALVOLUME_DATA_FETCH_CANCEL,
          payload: 'New slug is same as the last slug'
        })
      }

      return Observable.fromPromise(
        client.query({
          query: socialVolumeGQL,
          variables: {
            slug,
            socialVolumeType: 'PROFESSIONAL_TRADERS_CHAT_OVERVIEW',
            to: moment().toISOString(),
            from: moment()
              .subtract(1, 'months') // @NOTE(vanguard) query fails, if the value is more in past
              .toISOString()
          }
        })
      )
        .mergeMap(({ data: { socialVolume } }) => {
          return Observable.of({
            type: actions.SOCIALVOLUME_DATA_FETCH_SUCCESS,
            payload: {
              slug,
              data: socialVolume,
              isLoading: false,
              error: false
            }
          })
        })
        .catch(
          handleErrorAndTriggerAction(actions.SOCIALVOLUME_DATA_FETCH_FAILED)
        )
    })
