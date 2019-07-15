import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { filteringTypes } from '../constants'
import Range from '../Range'
import Stat from '../Stat'
import styles from './WatchlistAnomalies.module.scss'

const WatchlistAnomalies = ({
  range: { value },
  changeRange,
  trends = [],
  onFilterAssets,
  type
}) => {
  return trends.length > 0 ? (
    <div className={styles.wrapper}>
      <Icon type='flash' className={styles.icon} />
      <Range label='Anomalies' range={value} changeRange={changeRange} />
      <Button
        variant='flat'
        border
        className={cx(
          styles.button,
          type === filteringTypes.TRENDS && styles.active
        )}
        onClick={() => onFilterAssets(trends, filteringTypes.TRENDS)}
      >
        <Stat
          name='Trending assets:'
          values={[trends.length]}
          className={type === filteringTypes.TRENDS && styles.stat}
        />
      </Button>
    </div>
  ) : null
}

export default WatchlistAnomalies
