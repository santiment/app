import React from 'react'
import { Panel } from '@santiment-network/ui'
import cx from 'classnames'
import styles from './InsightCard.module.scss'
import InsightCardInternals from './InsightCardInternals'

const InsightCard = ({ className, ...insight }) => {
  return (
    <Panel className={cx(styles.wrapper, className)}>
      <InsightCardInternals {...insight} />
    </Panel>
  )
}

InsightCard.defaultProps = {
  votes: {},
  tags: [],
  comments: 0
}

export default InsightCard
