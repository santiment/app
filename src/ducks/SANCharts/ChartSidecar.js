import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import RecentlyWatched from '../../components/RecentlyWatched/RecentlyWatched'
import styles from './ChartSidecar.module.scss'

const ChartSidecar = () => {
  return (
    <div className={styles.wrapper}>
      <Icon type='arrow-left' className={styles.toggle} />
      <div className={styles.content}>
        <div className={styles.visible}>
          <RecentlyWatched
            className={styles.recents}
            onProjectClick={console.log}
          />
        </div>
      </div>
    </div>
  )
}

export default ChartSidecar
