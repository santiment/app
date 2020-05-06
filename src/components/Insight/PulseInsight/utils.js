import { client } from '../../../index'
import {
  LIKE_INSIGHT_MUTATION,
  UNLIKE_INSIGHT_MUTATION
} from '../../Like/likesGQL'
import { getAPIUrl } from '../../../utils/utils'

const insightsBaseLink = getAPIUrl().includes('stage')
  ? 'https://insights-stage.santiment.net'
  : 'https://insights.santiment.net'

export const transformLink = link => insightsBaseLink + link

export function toggleInsightLike (insightId, shouldLike) {
  return client.mutate({
    mutation: shouldLike ? LIKE_INSIGHT_MUTATION : UNLIKE_INSIGHT_MUTATION,
    variables: {
      id: +insightId
    }
  })
}
