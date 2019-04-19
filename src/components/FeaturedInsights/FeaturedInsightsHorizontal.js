import React from 'react'
import PropTypes from 'prop-types'
import InsightsFeatured from '../Insight/InsightsFeatured'
import styles from './FeaturedInsightsHorizontal.module.scss'

const FeaturedInsightsHorizontal = ({ maxLines, multilineTextId }) => (
  <section className={styles.insights}>
    <h4 className={styles.insights__title}>Featured insights</h4>
    <div className={styles.insights__wrapper}>
      <div className={styles.insights__scrollableWrapper}>
        <div className={styles.insights__scrollable}>
          <InsightsFeatured
            maxLines={maxLines}
            multilineTextId={multilineTextId}
            className={styles.insights__card}
          />
        </div>
      </div>
    </div>
  </section>
)

FeaturedInsightsHorizontal.propTypes = {
  maxLines: PropTypes.number.isRequired,
  multilineTextId: PropTypes.string.isRequired
}

export default FeaturedInsightsHorizontal
