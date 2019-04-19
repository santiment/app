import React from 'react'
import PropTypes from 'prop-types'
import InsightsFeatured from '../Insight/InsightsFeatured'
import styles from './FeaturedInsightsWithTitle.module.scss'

const FeaturedInsightsWithTitle = ({ maxLines, multilineTextId }) => (
  <section className={styles.insights}>
    <h4 className={styles.insights__title}>Featured insights</h4>
    <InsightsFeatured
      maxLines={maxLines}
      multilineTextId={multilineTextId}
      className={styles.insights__card}
    />
  </section>
)

FeaturedInsightsWithTitle.propTypes = {
  maxLines: PropTypes.number.isRequired,
  multilineTextId: PropTypes.string.isRequired
}

export default FeaturedInsightsWithTitle
