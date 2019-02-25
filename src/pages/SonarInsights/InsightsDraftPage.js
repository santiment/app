import React from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { INSIGHTS_USER_DRAFTS_QUERY } from './InsightsGQL'
import InsightDraftCard from '../../components/Insight/InsightDraftCard'
import styles from './InsightsDraftPage.module.scss'
import { filterInsightsOnlyDrafts, sortInsightsByDateDescending } from './utils'

const InsightsDraftPage = ({ data = {} }) => {
  const { insights = [] } = data
  const drafts = insights
    .filter(filterInsightsOnlyDrafts)
    .sort(sortInsightsByDateDescending)

  return (
    <div className={styles.wrapper}>
      {drafts.map(draft => (
        <InsightDraftCard key={draft.id} className={styles.card} {...draft} />
      ))}
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  userId: user.data.id
})

const enhance = compose(
  connect(mapStateToProps),

  graphql(INSIGHTS_USER_DRAFTS_QUERY, {
    options: ({ userId }) => ({
      variables: {
        userId: +userId
      }
    })
  })
)

export default enhance(InsightsDraftPage)
