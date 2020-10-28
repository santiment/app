import React from 'react'
import cx from 'classnames'
import Loader from '@santiment-network/ui/Loader/Loader'
import { formatNumber } from '../../utils/formatting'
import { Skeleton } from '../Skeleton'
import styles from './DashboardCounter.module.scss'

const DashboardCounter = ({
  formatter = formatNumber,
  loadings,
  value,
  title,
  classes = {}
}) => {
  return (
    <>
      <Skeleton
        show={loadings}
        className={cx(styles.skeleton, classes.skeleton)}
      />
      {!loadings && (
        <div className={styles.card}>
          <div className={styles.title}>{title}</div>
          <div className={styles.value}>
            {loadings ? (
              <Loader className={styles.loading} />
            ) : (
              formatter(value.toFixed(2))
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default DashboardCounter
