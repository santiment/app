import React from 'react'
import { Panel } from '@santiment-network/ui'
import cx from 'classnames'
import styles from './InsightCard.module.scss'
import InsightCardInternals from './InsightCardInternals'
import MarketcapChangeWidget from '../PostVisualBacktest'

const InsightCard = ({ className, ...insight }) => {
  const { createdAt, updatedAt, tags } = insight
  return (
    <Panel className={cx(styles.wrapper, styles.wrapper_withMc, className)}>
      <div className={styles.wrapper_withMc__left}>
        <InsightCardInternals {...insight} />
      </div>
      <div className={styles.wrapper_withMc__right}>
        <MarketcapChangeWidget
          from={createdAt}
          ticker={(tags[0] || {}).name}
          updatedAt={updatedAt}
        />
      </div>
    </Panel>
  )
}

InsightCard.defaultProps = {
  votes: {},
  tags: [],
  comments: 0
}

export default InsightCard
