import React, { useEffect } from 'react'
import cx from 'classnames'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PageLoader from '../../components/Loader/PageLoader'
import SonarFeedRecommendations from './SonarFeedRecommendations'
import { getSanSonarSW } from '../Account/SettingsSonarWebPushNotifications'
import { makeVariables } from '../feed/GeneralFeed/utils'
import ActivityRenderer from './ActivityRenderer/ActivityRenderer'
import { TRIGGERS_COMMON_FRAGMENT } from '../../ducks/Signals/common/queries'
import styles from './SonarFeedActivityPage.module.scss'

export const TRIGGER_ACTIVITIES_QUERY = gql`
  query signalsHistoricalActivity($limit: Int, $cursor: CursorInput) {
    activities: signalsHistoricalActivity(limit: $limit, cursor: $cursor) {
      cursor {
        before
        after
      }
      activity {
        payload
        triggeredAt
        trigger {
          ...triggersCommon
        }
        __typename
      }
    }
  }
  ${TRIGGERS_COMMON_FRAGMENT}
`

const SonarFeedActivityPage = ({ activities, loading, classes = {} }) => {
  if (loading) {
    return <PageLoader className={styles.loader} />
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
    <div className={cx(styles.wrapper, classes.activitiesWrapper)}>
      {activities.map((item, index) => (
        <ActivityRenderer
          activity={item}
          index={index}
          classes={classes}
          key={index}
        />
      ))}
    </div>
  ) : (
    <SonarFeedRecommendations description='There are not any activities yet' />
  )
}

export const getActivitiesEnhance = () =>
  graphql(TRIGGER_ACTIVITIES_QUERY, {
    options: () => ({
      variables: makeVariables(new Date().toISOString()),
      fetchPolicy: 'cache-and-network'
    }),
    props: ({ data }) => ({
      activities: (data.activities || {}).activity,
      loading: data.loading,
      error: data.error
    })
  })

const enhance = getActivitiesEnhance()

export default enhance(SonarFeedActivityPage)
