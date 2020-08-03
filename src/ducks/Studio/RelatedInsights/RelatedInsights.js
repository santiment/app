import React, { Fragment } from 'react'
import { useInsighgsByTag } from '../../../hooks/insights'
import PageLoader from '../../../components/Loader/PageLoader'
import WithInsightLikesMutation from '../../../components/Like/WithInsightLikesMutation'
import InsightCard from '../../../components/Insight/InsightCardWithMarketcap'
import PulseInsightWrapper from '../../../components/Insight/PulseInsight'
import styles from './RelatedInsights.module.scss'

const RelatedInsights = ({ settings }) => {
  const { ticker } = settings

  if (!ticker) {
    return null
  }

  const { data, loading } = useInsighgsByTag({ tag: ticker })

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Related Insights</div>
        </div>

        <div className={styles.insights}>
          {loading && <PageLoader />}

          {data.map(insight => {
            return (
              <Fragment key={insight.id}>
                {insight.isPulse ? (
                  <PulseInsightWrapper key={insight.id} insight={insight} />
                ) : (
                  <WithInsightLikesMutation>
                    {like => (
                      <InsightCard
                        {...insight}
                        onLike={like(insight.id)}
                        showIcon={true}
                      />
                    )}
                  </WithInsightLikesMutation>
                )}
              </Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default RelatedInsights
