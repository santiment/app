import React from 'react'
import { Panel } from '@santiment-network/ui'
import cx from 'classnames'
import withSizes from 'react-sizes'
import { mapSizesToProps } from '../../App'
import InsightCardInternals from './InsightCardInternals'
import MarketcapChangeWidget from '../PostVisualBacktest'
import { noTrendTagsFilter } from './utils'
import styles from './InsightCard.module.scss'

const InsightCard = ({ className, tags, isDesktop, ...insight }) => {
  const { createdAt, updatedAt, publishedAt } = insight
  const filteredTags = tags.filter(noTrendTagsFilter)
  return (
    <Panel className={cx(styles.wrapper, styles.wrapper_withMc, className)}>
      <div className={styles.wrapper_withMc__left}>
        <InsightCardInternals {...insight} tags={filteredTags} />
      </div>
      {isDesktop && (
        <div className={styles.wrapper_withMc__right}>
          <MarketcapChangeWidget
            from={createdAt}
            ticker={(filteredTags[0] || {}).name}
            updatedAt={updatedAt}
            publishedAt={publishedAt || updatedAt}
          />
        </div>
      )}
    </Panel>
  )
}

InsightCard.defaultProps = {
  votes: {},
  tags: [],
  comments: 0
}

export default withSizes(mapSizesToProps)(InsightCard)
