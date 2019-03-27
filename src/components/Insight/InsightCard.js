import React from 'react'
import { Panel } from '@santiment-network/ui'
import cx from 'classnames'
import styles from './InsightCard.module.scss'
import InsightCardInternals from './InsightCardInternals'
import { noTrendTagsFilter } from './utils'

const InsightCard = ({ className, tags, ...insight }) => {
  const filteredTags = tags.filter(noTrendTagsFilter)
  return (
    <Panel className={cx(styles.wrapper, className)}>
      <InsightCardInternals {...insight} tags={filteredTags} />
    </Panel>
  )
}

InsightCard.defaultProps = {
  votes: {},
  tags: [],
  comments: 0
}

export default InsightCard
