import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import { ProjectSelector } from '../../../ducks/SANCharts/Header'
import styles from './RecentsFeed.module.scss'
import GainersLosersTabs from '../../../components/GainersAndLosers/GainersLosersTabs'
import RecentlyWatched from '../../../components/RecentlyWatched/RecentlyWatched'
import Categories from '../../../ducks/SANCharts/Categories'

const RecentsFeed = ({}) => {
  const setOpenedList = () => {}

  const onSlugSelect = () => {}

  return (
    <div className={styles.container}>
      <div>
        <ProjectSelector
          trigger={() => (
            <div className={styles.search}>
              Explore assets
              <Icon type='search' className={styles.searchIcon} />
            </div>
          )}
        />
      </div>
      <div className={styles.scrollable}>
        <RecentlyWatched
          className={styles.section}
          onProjectClick={onSlugSelect}
          onWatchlistClick={setOpenedList}
          classes={styles}
        />

        <div className={styles.block}>
          <h2 className={styles.subTitle}>Categories</h2>
          <Categories onClick={setOpenedList} />
        </div>

        <div className={styles.block}>
          <h2 className={styles.subTitle}>Gainers and loosers</h2>
          <GainersLosersTabs
            timeWindow='2d'
            size={8}
            classes={styles}
            onProjectClick={({ slug }) => {
              // history.push(`/projects/${slug}`)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default RecentsFeed
