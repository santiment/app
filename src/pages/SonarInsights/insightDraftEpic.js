import { Observable } from 'rxjs'
import { handleErrorAndTriggerAction } from '../../epics/utils'
import {
  CREATE_INSIGHT_DRAFT_MUTATION,
  UPDATE_INSIGHT_DRAFT_MUTATION
} from './InsightsGQL'
import * as actions from './actions'

const createDraft$ = ({ title, text, tags }, client) => {
  return Observable.from(
    client.mutate({
      mutation: CREATE_INSIGHT_DRAFT_MUTATION,
      variables: {
        title,
        text,
        tags
      }
    })
  )
}

const updateDraft$ = ({ id, title, text, tags }, client) => {
  return Observable.from(
    client.mutate({
      mutation: UPDATE_INSIGHT_DRAFT_MUTATION,
      variables: {
        id,
        title,
        text,
        tags
      }
    })
  )
}

const insightDraftEpic = (action$, store, { client }) =>
  action$.ofType(actions.INSIGHT_DRAFT_UPDATE).switchMap(({ payload }) => {
    const { tags, ...rest } = payload
    const normalizedTags = tags.map(({ name }) => name)

    return (payload.id ? updateDraft$ : createDraft$)(
      { tags: normalizedTags, ...rest },
      client
    )
      .switchMap(({ data: { updatedDraft: { id, updatedAt } } }) => {
        return Observable.of({
          type: actions.INSIGHT_DRAFT_UPDATE_SUCCESS,
          payload: {
            id,
            updatedAt
          }
        })
      })
      .catch(handleErrorAndTriggerAction(actions.INSIGHT_DRAFT_UPDATE_FAILED))
  })

export default insightDraftEpic
