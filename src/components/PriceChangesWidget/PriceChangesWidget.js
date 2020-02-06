import React from 'react'
import cx from 'classnames'
import { graphql } from 'react-apollo'
import Label from '@santiment-network/ui/Label'
import { MIN_MAX_PRICE_QUERY } from '../../ducks/SANCharts/gql'
import PercentChanges from '../PercentChanges'
import { formatNumber } from '../../utils/formatting'
import styles from './PriceChangesWidget.module.scss'

const OFFSET_IN_HOURS = {
  '24h': 24,
  '7d': 24 * 7
}

const PriceChangesWidget = ({
  className,
  changes,
  onChangeRange,
  range = '24h',
  price,
  isDesktop,
  data: { getMetric = {} }
}) => {
  const { min = 0, max = 0 } = getMetric
  const minPrice = formatNumber(min, { currency: 'USD' })
  const maxPrice = formatNumber(max, { currency: 'USD' })

  let offset = ((price - min) * 100) / (max - min)

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
          <PercentChanges changes={changes} />
        )}
        <Label className={styles.period} onClick={onChangeRange}>
          {range}
        </Label>
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
  skip: ({ slug, range }) => !slug && !range,
  options: ({ slug, range }) => {
    const to = new Date()
    const from = new Date()
    to.setHours(to.getHours(), 0, 0, 0)
    from.setHours(from.getHours() - OFFSET_IN_HOURS[range], 0, 0, 0)
    return {
      variables: { slug, from: from.toISOString(), to: to.toISOString() }
    }
  }
})(PriceChangesWidget)
