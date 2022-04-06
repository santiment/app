import React, { Fragment } from 'react'
import cx from 'classnames'
import { TODAY, YESTERDAY } from './dates'
import FeedItemRenderer from '../FeedItemRenderer/FeedItemRenderer'
import SonarFeedRecommendations from '../../../SonarFeed/SonarFeedRecommendations'
import Loader from '@santiment-network/ui/Loader/Loader'
import MakeProSubscriptionCard from '../MakeProSubscriptionCard/MakeProSubscriptionCard'
import { getDateFormats } from '../../../../utils/dates'
import StoriesList from '../../../../components/Stories/StoriesList'
import PageLoader from '../../../../components/Loader/PageLoader'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'
import styles from './FeedList.module.scss'
import externalStyles from '../GeneralFeed.module.scss'
import feedItemStyles from './../FeedItemRenderer/FeedItemRenderer.module.scss'

const getEventDate = ({ insertedAt, publishedAt }) =>
  insertedAt ? new Date(insertedAt) : new Date(publishedAt)

export const makeDateLabel = (date) => {
  switch (date.toLocaleDateString()) {
    case TODAY: {
      return 'Today'
    }
    case YESTERDAY: {
      return 'Yesterday'
    }
    default: {
      const { DD, MMM, YYYY } = getDateFormats(date)
      return `${DD} ${MMM}, ${YYYY}`
    }
  }
}

const checkItemWithIndex = (group, item, index) => {
  if (index === 1) {
    item.addProCard = true
  }

  if (index === 3) {
    item.addStories = true
  }

  item.index = index

  group.items.push(item)
}

export const groupByDates = (events) => {
  const groups = []

  for (let i = 0; i < events.length; ) {
    const item = events[i]
    const date = getEventDate(item)

    const group = {
      date: date,
      items: [],
      label: makeDateLabel(date),
    }
    checkItemWithIndex(group, item, i)

    while (
      ++i < events.length &&
      date.toLocaleDateString() === getEventDate(events[i]).toLocaleDateString()
    ) {
      checkItemWithIndex(group, events[i], i)
    }

    groups.push(group)
  }

  return groups
}

const FeedList = ({ events, isLoading, isNewEventsList, showProfileExplanation }) => {
  if (isNewEventsList && isLoading) {
    return (
      <div className={externalStyles.scrollable}>
        <PageLoader />
      </div>
    )
  }

  const hasData = events && events.length > 0
  const groups = groupByDates(events)

  return (
    <>
      {hasData ? (
        <RenderFeedGroups groups={groups} showProfileExplanation={showProfileExplanation} />
      ) : (
        <SonarFeedRecommendations description='There are not any activities yet' />
      )}
      {isLoading && <Loader className={styles.loader} />}
    </>
  )
}

export const RenderFeedGroups = ({
  groups,
  showProfileExplanation,
  groupRenderer: GroupRenderer = RenderFeedGroupItems,
}) => {
  return groups.map((item, index) => {
    const { label, items } = item
    return (
      <Fragment key={index}>
        <div className={cx(styles.date, index !== 0 && styles.next)}>{label}</div>
        <GroupRenderer
          groupIndex={index}
          items={items}
          showProfileExplanation={showProfileExplanation}
        />
      </Fragment>
    )
  })
}

export const RenderFeedGroupItems = ({ items, groupIndex, showProfileExplanation }) => {
  const { isPro } = useUserSubscriptionStatus()

  return (
    <>
      {items.map((item, itemIndex) => (
        <Fragment key={itemIndex}>
          <div className={styles.block}>
            <FeedItemRenderer
              item={item}
              index={groupIndex}
              showProfileExplanation={showProfileExplanation}
            />
            {!isPro && item.addProCard && <MakeProSubscriptionCard classes={feedItemStyles} />}
          </div>

          {item.addStories && <StoriesList classes={styles} showScrollBtns />}
        </Fragment>
      ))}
    </>
  )
}

export default FeedList
