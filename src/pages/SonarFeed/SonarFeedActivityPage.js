import React, { Fragment, useEffect } from 'react'
import { graphql } from 'react-apollo'
import Markdown from 'react-markdown'
import gql from 'graphql-tag'
import PageLoader from '../../components/Loader/PageLoader'
import SonarFeedRecommendations from './SonarFeedRecommendations'
import { dateDifferenceInWords } from '../../utils/dates'
import { getSanSonarSW } from '../Account/SettingsSonarWebPushNotifications'
import styles from './SonarFeedActivityPage.module.scss'

export const TRIGGER_ACTIVITIES_QUERY = gql`
  query signalsHistoricalActivity($datetime: DateTime!) {
    activities: signalsHistoricalActivity(
      limit: 10
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

const SonarFeedActivityPage = ({ activities, isLoading, isError }) => {
  if (isLoading) {
    return <PageLoader className={styles.loader} />
  }

  const formatDate = dateString => {
    return dateDifferenceInWords({
      from: new Date(dateString)
    })
  }

  const sendUpdate = () => {
    if (!activities) {
      return
    }

    navigator.serviceWorker &&
      navigator.serviceWorker.getRegistrations &&
      navigator.serviceWorker.getRegistrations().then(registrations => {
        const sanServiceRegistration = getSanSonarSW(registrations)

        if (sanServiceRegistration) {
          if (activities.length > 0) {
            navigator &&
              navigator.serviceWorker &&
              navigator.serviceWorker.controller &&
              navigator.serviceWorker.controller.postMessage({
                type: 'SONAR_FEED_ACTIVITY',
                data: {
                  lastTriggeredAt: activities[0].triggeredAt
                }
              })
          }
        }
      })
  }

  useEffect(() => {
    sendUpdate()
    return () => {
      sendUpdate()
    }
  })

  return activities && activities.length ? (
    <div className={styles.wrapper}>
      {activities.map(activity => (
        <Fragment key={activity.triggeredAt}>
          <h4 className={styles.date}>{formatDate(activity.triggeredAt)}</h4>
          <Markdown source={Object.values(activity.payload)[0]} />
        </Fragment>
      ))}
    </div>
  ) : (
    <SonarFeedRecommendations description='There are not any activities yet' />
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
      isError: !!data.error
    }
  }
})

export default enhance(SonarFeedActivityPage)
