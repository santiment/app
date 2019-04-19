import React from 'react'
import PropTypes from 'prop-types'
import { Panel } from '@santiment-network/ui'
import InsightsFeatured from '../Insight/InsightsFeatured'
import styles from './FeaturedInsightsScrollable.module.scss'

const FeaturedInsightsScrollable = ({ maxLines, multilineTextId }) => (
  <div className={styles.insights}>
    <Panel className={styles.insights__panel}>
      <div className={styles.insights__list}>
        <InsightsFeatured
          maxLines={maxLines}
          multilineTextId={multilineTextId}
          className={styles.insights__card}
        />
      </div>
    </Panel>
  </div>
)

FeaturedInsightsScrollable.propTypes = {
  maxLines: PropTypes.number.isRequired,
  multilineTextId: PropTypes.string.isRequired
}

export default FeaturedInsightsScrollable
