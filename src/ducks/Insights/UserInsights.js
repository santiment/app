import React, { useMemo } from 'react'
import { DEFAULT_INSIGHTS_PER_PAGE } from '../../hooks/insights'
import ScrollableInsightsList, {
  useScrollabelPages
} from './ScrollableInsightsList'
import { ALL_INSIGHTS_BY_USER } from '../../queries/InsightsGQL'

const useInsightsByUserSettings = ({ userId }) => {
  const { page, setPage } = useScrollabelPages()

  const variables = useMemo(
    () => {
      return {
        userId: +userId,
        page: page,
        pageSize: DEFAULT_INSIGHTS_PER_PAGE
      }
    },
    [userId, page]
  )

  return { variables, page, setPage }
}

const UserInsights = ({ userId }) => {
  const settings = useMemo(
    () => ({
      userId
    }),
    [userId]
  )

  const { variables, page, setPage } = useInsightsByUserSettings(settings)

  return (
    <ScrollableInsightsList
      query={ALL_INSIGHTS_BY_USER}
      variables={variables}
      setPage={setPage}
      page={page}
      settings={settings}
    />
  )
}

export default UserInsights
