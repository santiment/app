import React, { Fragment } from 'react'
import SonarFeedRecommendations from './SonarFeedRecommendations'
import SignalCard from '../../components/SignalCard/SignalCard'
import styles from './SonarFeedActivityPage.module.scss'

const defaultActivities = {
  'Today, Dec 21': [
    {
      id: 0,
      title: 'Ethereum price increased',
      description:
        'Signal to track the activity of selected address based on Ethereum'
    },
    {
      id: 1,
      title: 'Daily trending words',
      description:
        'Signal to get daily list of trending words connected with crypto'
    }
  ],
  'Yesterday, Dec 20': [
    {
      id: 0,
      title: 'Ethereum price increased',
      description:
        'Signal to track the activity of selected address based on Ethereum'
    }
  ]
}

const SonarFeedActivityPage = ({ activities = defaultActivities }) => {
  return (
    <div className={styles.wrapper}>
      {activities ? (
        Object.keys(activities).map(date => (
          <Fragment key={date}>
            <h4 className={styles.date}>{date}</h4>
            {activities[date].map(({ id, title, description }) => (
              <SignalCard
                key={id}
                className={styles.signal}
                title={title}
                description={description}
              />
            ))}
          </Fragment>
        ))
      ) : (
        <SonarFeedRecommendations />
      )}
    </div>
  )
}

export default SonarFeedActivityPage
