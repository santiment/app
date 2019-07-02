import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import RecentlyWatched from '../../components/RecentlyWatched/RecentlyWatched'
import GainersLosersTabs from '../../components/GainersAndLosers/GainersLosersTabs'
import styles from './ChartSidecar.module.scss'

const ChartSidecar = ({ onSlugSelect }) => {
  return (
    <div className={styles.wrapper}>
      <Icon type='arrow-left-big' className={styles.toggle} />
      <div className={styles.content}>
        <div className={styles.visible}>
          <RecentlyWatched
            className={styles.section}
            onProjectClick={onSlugSelect}
          />
          <section className={styles.section}>
            <h2 className={styles.subtitle}>Social gainers and losers</h2>
            <GainersLosersTabs
              timeWindow='2d'
              size={8}
              onProjectClick={onSlugSelect}
              classes={styles}
            />
          </section>
        </div>
      </div>
    </div>
  )
}

export default ChartSidecar
