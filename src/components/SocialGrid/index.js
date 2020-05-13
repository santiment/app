import React, { useState } from 'react'
import cx from 'classnames'
import { SETTINGS } from './topics'
import { TOPICS } from './topics'
import Item from './Item'
import { Metric } from '../../ducks/dataHub/metrics'
import styles from './index.module.scss'

const SHOW_STEP = 6

const charts = [Metric.social_volume_total]

const SocialGrid = ({ className, onTopicClick, topics = TOPICS }) => {
  const [showCount, setShowCount] = useState(SHOW_STEP)
  const [loadedCount, setLoadedCount] = useState(0)

  function onLoad () {
    const newCount = loadedCount + 1
    setLoadedCount(newCount)

    if (showCount - newCount <= 5) {
      setShowCount(showCount + SHOW_STEP)
    }
  }

  return (
    <section className={cx(styles.wrapper, className)}>
      {topics.map((topic, idx) => (
        <Item
          key={idx}
          show={showCount > idx}
          topic={topic.name ? topic.name : topic}
          link={topic.query || topic}
          charts={charts}
          onTopicClick={onTopicClick}
          settings={SETTINGS}
          onLoad={onLoad}
          className={styles.item}
        />
      ))}
    </section>
  )
}

export default SocialGrid
