import React from 'react'
import cx from 'classnames'
import { graphql } from 'react-apollo'
import Label from '@santiment-network/ui/Label'
import { MIN_MAX_PRICE_QUERY } from '../../ducks/SANCharts/gql'
import PercentChanges from '../PercentChanges'
import { formatNumber } from '../../utils/formatting'
import { DAY, getTimeIntervalFromToday } from '../../utils/dates'
import styles from './PriceChangesWidget.module.scss'

const PriceChangesWidget = ({
  className,
  percentChange7d,
  percentChange24h,
  price,
  isDesktop,
  data: { getMetric = {} }
}) => {
  const { min = 0, max = 0 } = getMetric
  const minPrice = formatNumber(min, { currency: 'USD' })

  const maxPrice = formatNumber(max, { currency: 'USD' })

  let offset = ((price - min) * 100) / (max - min)

  console.log(offset, price, min, max)

  if (isFinite(offset)) {
    if (offset < 0) {
      offset = 0
    } else if (offset > 100) {
      offset = 100
    }
  }

  return isFinite(offset) ? (
    <section className={cx(styles.wrapper, className)}>
      <div className={styles.top}>
        {isDesktop ? (
          <span className={styles.text}>High/Low Price</span>
        ) : (
          <PercentChanges changes={percentChange24h} />
        )}
        <Label className={styles.period}>24h</Label>
      </div>
      <div className={styles.progress}>
        <span className={styles.line} style={{ '--progress': `${offset}%` }} />
        <span className={styles.min}>{minPrice}</span>
        <span className={styles.max}>{maxPrice}</span>
      </div>
    </section>
  ) : null
}

export default graphql(MIN_MAX_PRICE_QUERY, {
  skip: ({ slug }) => !slug,
  options: ({ slug }) => {
    const { from, to } = getTimeIntervalFromToday(-1, DAY)
    return { variables: { slug, from, to } }
  }
})(PriceChangesWidget)
