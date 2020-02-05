import React from 'react'
import { Icon, Panel } from '@santiment-network/ui'
import cx from 'classnames'
import withSizes from 'react-sizes'
import InsightCardInternals from './InsightCardInternals'
import MarketcapChangeWidget from '../PostVisualBacktest'
import { noTrendTagsFilter } from './utils'
import { mapSizesToProps } from '../../utils/withSizes'
import FeedCardDate from '../../pages/feed/GeneralFeed/CardDate/FeedCardDate'
import styles from './InsightCard.module.scss'

export const AWAITING_APPROVAL_STATE = 'awaiting_approval'
export const AwaitingApproval = () => (
  <div className={styles.awaiting}>
    <Icon type='awaiting' className={styles.awaiting__icon} /> Awaiting approval
  </div>
)

const InsightCard = ({ className, tags, isDesktop, showIcon, ...insight }) => {
  const { createdAt, updatedAt, publishedAt, state } = insight
  const filteredTags = tags.filter(noTrendTagsFilter)

  return (
    <Panel className={cx(styles.wrapper, styles.wrapper_withMc, className)}>
      <InsightCardInternals
        {...insight}
        tags={filteredTags}
        isDesktop={isDesktop}
        showIcon={showIcon}
      >
        <div className={styles.wrapper_withMc__right}>
          <>
            {state === AWAITING_APPROVAL_STATE ? (
              <AwaitingApproval />
            ) : (
              <FeedCardDate
                date={publishedAt || createdAt}
                className={styles.date}
              />
            )}
          </>

          <MarketcapChangeWidget
            from={createdAt}
            ticker={(filteredTags[0] || {}).name}
            updatedAt={updatedAt}
            publishedAt={publishedAt || updatedAt}
          />
        </div>
      </InsightCardInternals>
    </Panel>
  )
}

InsightCard.defaultProps = {
  votes: {},
  tags: [],
  comments: 0
}

export default withSizes(mapSizesToProps)(InsightCard)
