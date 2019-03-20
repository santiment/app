import React, { Fragment } from 'react'
import { graphql } from 'react-apollo'
import Markdown from 'react-markdown'
import gql from 'graphql-tag'
import SonarFeedRecommendations from './SonarFeedRecommendations'
import SignalCard from '../../components/SignalCard/SignalCard'
import styles from './SonarFeedActivityPage.module.scss'

export const TRIGGER_ACTIVITIES_QUERY = gql`
  query signalsHistoricalActivity($datetime: DateTime!) {
    activities: signalsHistoricalActivity(
      limit: 5
      cursor: { type: BEFORE, datetime: $datetime }
    ) {
      cursor {
        before
        after
      }
      activity {
        payload
        triggeredAt
        userTrigger {
          trigger {
            title
            description
          }
        }
      }
    }
  }
`

const SonarFeedActivityPage = ({ activities, isLoading, isError, isEmpty }) => {
  if (isLoading) {
    return <div className={styles.wrapper}>Loading...</div>
  }
  if (isEmpty) {
    return ''
  }
  return activities ? (
    <div className={styles.wrapper}>
      {activities.map(activity => (
        <Fragment key={activity.triggeredAt}>
          <h4 className={styles.date}>{activity.triggeredAt}</h4>
          <Markdown source={Object.values(activity.payload)[0]} />
        </Fragment>
      ))}
    </div>
  ) : (
    <SonarFeedRecommendations />
  )
}

const enhance = graphql(TRIGGER_ACTIVITIES_QUERY, {
  options: () => ({
    variables: {
      datetime: new Date().toISOString()
    },
    fetchPolicy: 'cache-and-network'
  }),
  props: ({ data }) => {
    return {
      activities: (data.activities || {}).activity,
      isLoading: data.loading,
      isError: !!data.error,
      isEmpty: ((data.activities || {}).activity || []).length === 0
    }
  }
})

export default enhance(SonarFeedActivityPage)
