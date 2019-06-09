import React from 'react'
import PropTypes from 'prop-types'
import { Panel } from '@santiment-network/ui'
import InsightsLatest from './InsightsLatest'
import InsightsFeatured from './InsightsFeatured'
import styles from './InsightsScrollable.module.scss'

export const TYPES = {
  latest: 'LATEST',
  featured: 'FEATURED'
}

const InsightsScrollable = ({ maxLines, multilineTextId, type }) => (
  <div className={styles.insights}>
    <Panel className={styles.insights__panel}>
      <div className={styles.insights__list}>
        {type === TYPES.featured && (
          <InsightsFeatured
            maxLines={maxLines}
            multilineTextId={multilineTextId}
            className={styles.insights__card}
          />
        )}
        {type === TYPES.latest && (
          <InsightsLatest
            maxLines={maxLines}
            multilineTextId={multilineTextId}
            className={styles.insights__card}
          />
        )}
      </div>
    </Panel>
  </div>
)

InsightsScrollable.propTypes = {
  maxLines: PropTypes.number.isRequired,
  multilineTextId: PropTypes.string.isRequired,
  type: PropTypes.oneOf([TYPES.latest, TYPES.featured]).isRequired
}

export default InsightsScrollable
