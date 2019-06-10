import React from 'react'
import PropTypes from 'prop-types'
import { Panel } from '@santiment-network/ui'
import InsightsLatest from './InsightsLatest'
import InsightsFeatured from './InsightsFeatured'
import styles from './InsightsScrollable.module.scss'

export const TYPES = {
  latest: InsightsLatest,
  featured: InsightsFeatured
}

const InsightsScrollable = ({ maxLines, multilineTextId, type }) => {
  const Insights = TYPES[type]
  return (
    <div className={styles.insights}>
      <Panel className={styles.insights__panel}>
        <div className={styles.insights__list}>
          <Insights
            maxLines={maxLines}
            multilineTextId={multilineTextId}
            className={styles.insights__card}
          />
        </div>
      </Panel>
    </div>
  )
}

InsightsScrollable.propTypes = {
  maxLines: PropTypes.number.isRequired,
  multilineTextId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['latest', 'featured']).isRequired
}

export default InsightsScrollable
