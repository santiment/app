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
import { DesktopOnly } from '../Responsive'

export const AWAITING_APPROVAL_STATE = 'awaiting_approval'
export const AwaitingApproval = () => (
  <div className={styles.awaiting}>
    <Icon type='awaiting' className={styles.awaiting__icon} /> Awaiting approval
  </div>
)

const InsightCard = ({ className, tags, isDesktop, showIcon, ...insight }) => {
  const { createdAt, updatedAt, publishedAt, state } = insight
  const filteredTags = tags.filter(noTrendTagsFilter)

  const firstTag = filteredTags[0]

  return (
    <Panel className={cx(styles.wrapper, styles.wrapper_withMc, className)}>
      <InsightCardInternals
        {...insight}
        tags={filteredTags}
        isDesktop={isDesktop}
        showIcon={showIcon}
        showDate={!isDesktop}
      >
        <div className={styles.wrapper_withMc__right}>
          <DesktopOnly>
            {state === AWAITING_APPROVAL_STATE ? (
              <AwaitingApproval />
            ) : (
              <FeedCardDate
                date={publishedAt || createdAt}
                className={styles.date}
              />
            )}
          </DesktopOnly>

          {firstTag && (
            <MarketcapChangeWidget
              from={createdAt}
              ticker={firstTag.name.toUpperCase()}
              updatedAt={updatedAt}
              publishedAt={publishedAt || updatedAt}
            />
          )}
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
