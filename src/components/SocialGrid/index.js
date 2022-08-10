import React, { useMemo, useState } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { checkHasPremium } from '../../pages/UserSelectors'
import { SETTINGS } from './topics'
import { TOPICS } from './topics'
import Item from './Item'
import { Metric } from '../../ducks/dataHub/metrics'
import styles from './index.module.scss'

const SHOW_STEP = 6

const METRICS = [Metric.social_volume_total]

const SocialGrid = ({ className, onTopicClick, hasPremium, topics = TOPICS }) => {
  const [showCount, setShowCount] = useState(SHOW_STEP)
  const [loadedCount, setLoadedCount] = useState(0)

  function onLoad() {
    const newCount = loadedCount + 1
    setLoadedCount(newCount)

    if (showCount - newCount <= 5) {
      setShowCount(showCount + SHOW_STEP)
    }
  }

  const items = topics.filter((topic) => {
    if (topic.type) {
      if (topic.type === 'PRO') {
        return hasPremium
      } else {
        return !hasPremium
      }
    }

    return true
  })

  return (
    <section className={cx(styles.wrapper, className)}>
      {items.map((topic, idx) => {
        const { createdAt, slug, price, ticker } = topic
        const { settings, metrics } = useMemo(() => {
          if (price) {
            return {
              metrics: METRICS.concat(Metric.price_usd),
              settings: Object.assign({ slug: price }, SETTINGS),
            }
          }
          return { metrics: METRICS, settings: SETTINGS }
        }, [])

        return (
          <Item
            key={slug}
            show={showCount > idx}
            topic={topic.slug}
            title={topic.title || topic.slug}
            link={topic.query || topic.slug}
            createdAt={createdAt}
            metrics={metrics}
            price={price}
            priceTicker={ticker}
            onTopicClick={onTopicClick}
            settings={settings}
            onLoad={onLoad}
            className={styles.item}
          />
        )
      })}
    </section>
  )
}

const mapStateToProps = (state) => ({
  hasPremium: checkHasPremium(state),
})

export default connect(mapStateToProps)(SocialGrid)
