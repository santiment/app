import React, { useMemo } from 'react'
import { DEFAULT_INSIGHTS_PER_PAGE } from '../../../hooks/insights'
import { ALL_INSIGHTS_QUERY } from '../../../queries/InsightsGQL'
import ScrollableInsightsList, {
  useScrollabelPages
} from '../../Insights/ScrollableInsightsList'
import styles from './RelatedInsights.module.scss'

const useInsightsByTagSettings = ({ ticker }) => {
  const { page, setPage } = useScrollabelPages()

  const variables = useMemo(
    () => {
      return {
        tags: [ticker],
        page: page,
        pageSize: DEFAULT_INSIGHTS_PER_PAGE
      }
    },
    [ticker, page]
  )

  return { variables, page, setPage }
}

const RelatedInsights = ({ settings }) => {
  const { variables, page, setPage } = useInsightsByTagSettings(settings)

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Related Insights</div>
        </div>

        <div className={styles.insights}>
          <ScrollableInsightsList
            query={ALL_INSIGHTS_QUERY}
            variables={variables}
            setPage={setPage}
            page={page}
            settings={settings}
            target={'asset'}
          />
        </div>
      </div>
    </div>
  )
}

export default RelatedInsights
