import React from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import ChartSignalCreationDialog from '../../SANCharts/ChartSignalCreationDialog'
import styles from './index.module.scss'

const Actions = ({ ...props }) => {
  return (
    <div className={styles.actions}>
      <ChartSignalCreationDialog
        // slug={slug}
        trigger={
          <Button className={styles.btn}>
            <Icon type='signal' className={styles.btn__icon} />
            Create Alert
          </Button>
        }
      />

      <div className={styles.divider} />

      <Button className={styles.btn}>
        <Icon type='copy' className={styles.btn__icon} />
        Add to Watchlist
      </Button>

      <div className={styles.divider} />

      <Button className={styles.btn}>
        <Icon type='comment' className={styles.btn__icon} />
        Leave comment
      </Button>
    </div>
  )
}

export default Actions
