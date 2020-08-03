import React from 'react'
import { useInsighgsByTag } from '../../../hooks/insights'
import PageLoader from '../../../components/Loader/PageLoader'
import NoInsights from './NoInsights'
import InsightsFeed from '../../../components/Insight/InsightsFeed'
import styles from './RelatedInsights.module.scss'

const RelatedInsights = ({ settings }) => {
  const { ticker } = settings

  if (!ticker) {
    return null
  }

  const { data, loading } = useInsighgsByTag({ tag: ticker })

  console.log('data', data)

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Related Insights</div>
        </div>

        <div className={styles.insights}>
          {loading && <PageLoader />}

          {!loading && data.length === 0 && <NoInsights />}

          <InsightsFeed insights={data} />
        </div>
      </div>
    </div>
  )
}

export default RelatedInsights
