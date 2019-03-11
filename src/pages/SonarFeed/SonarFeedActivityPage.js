import React, { Fragment } from 'react'
import SonarFeedRecommendations from './SonarFeedRecommendations'
import SignalCard from '../../components/SignalCard/SignalCard'
import styles from './SonarFeedActivityPage.module.scss'

const SonarFeedActivityPage = ({ activities }) => {
  return activities ? (
    <div className={styles.wrapper}>
      {Object.keys(activities).map(date => (
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
      ))}
    </div>
  ) : (
    <SonarFeedRecommendations />
  )
}

export default SonarFeedActivityPage
