import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { checkHasPremium } from '../../pages/UserSelectors'
import { TOPICS } from './topics'
import Item from './Item'
import styles from './index.module.scss'

const SHOW_STEP = 6

const SocialGrid = ({ className, onTopicClick, hasPremium, topics = TOPICS, isCompact }) => {
  const [showCount, setShowCount] = useState(SHOW_STEP)
  const [loadedCount, setLoadedCount] = useState(0)
  const [isShowMore, setIsShowMore] = useState(false)
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

  const [charts, setCharts] = useState(isCompact ? items.slice(0, 6) : items)

  useEffect(() => {
    if (isCompact && isShowMore) {
      setCharts(items)
    }
  }, [isShowMore])

  function onLoad() {
    const newCount = loadedCount + 1
    setLoadedCount(newCount)

    if (showCount - newCount <= 5) {
      setShowCount(showCount + SHOW_STEP)
    }
  }

  return (
    <>
      <section className={cx(styles.wrapper, className)}>
        {charts.map((topic, idx) => {
          const { createdAt, slug, price, ticker } = topic

          return (
            <Item
              key={slug}
              show={showCount > idx}
              topic={topic.slug}
              title={topic.title || topic.slug}
              link={topic.query || topic.slug}
              createdAt={createdAt}
              price={price}
              priceTicker={ticker}
              onTopicClick={onTopicClick}
              onLoad={onLoad}
              isCompact={isCompact}
            />
          )
        })}
      </section>
      {isCompact && !isShowMore && (
        <button
          className={cx(styles.showMore, 'btn-2 row hv-center mrg-xl mrg--b')}
          onClick={() => setIsShowMore(true)}
        >
          Show more
        </button>
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  hasPremium: checkHasPremium(state),
})

export default connect(mapStateToProps)(SocialGrid)
