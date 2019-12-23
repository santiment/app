import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { graphql } from 'react-apollo'
import Markdown from 'react-markdown'
import gql from 'graphql-tag'
import PageLoader from '../../components/Loader/PageLoader'
import SonarFeedRecommendations from './SonarFeedRecommendations'
import { dateDifferenceInWords } from '../../utils/dates'
import { getSanSonarSW } from '../Account/SettingsSonarWebPushNotifications'
import { SIGNAL_ANCHORS } from '../../ducks/Signals/common/constants'
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
        trigger {
          id
          title
        }
      }
    }
  }
`

const SonarFeedActivityPage = ({ activities, loading, classes = {} }) => {
  if (loading) {
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
    <div className={cx(styles.wrapper, classes.activitiesWrapper)}>
      {activities.map(
        (
          { triggeredAt, payload, trigger: { id: signalId, title } = {} },
          index
        ) => (
          <div
            key={triggeredAt + '_' + signalId}
            className={cx(
              styles.activityItem,
              classes.activityItem,
              index === 0 && classes.firstActivity
            )}
          >
            <div className={cx(styles.description, classes.activityCustom)}>
              <h4 className={styles.date}>
                {formatDate(triggeredAt)} by{' '}
                <Link
                  to={`/sonar/signal/${signalId}${SIGNAL_ANCHORS.ACTIVITIES}`}
                  className={styles.link}
                >
                  {title}
                </Link>
              </h4>
            </div>
            <Markdown
              source={Object.values(payload)[0]}
              className={classes.activityMarkdown}
            />
          </div>
        )
      )}
    </div>
  ) : (
    <SonarFeedRecommendations description='There are not any activities yet' />
  )
}

export const getActivitiesEnhance = () => {
  return graphql(TRIGGER_ACTIVITIES_QUERY, {
    options: () => ({
      variables: {
        datetime: new Date().toISOString()
      },
      fetchPolicy: 'cache-and-network'
    }),
    props: ({ data }) => {
      return {
        activities: (data.activities || {}).activity,
        loading: data.loading,
        error: data.error
      }
    }
  })
}

const enhance = getActivitiesEnhance()

export default enhance(SonarFeedActivityPage)
