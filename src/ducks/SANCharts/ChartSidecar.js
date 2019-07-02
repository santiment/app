import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { AssetsList } from '../../pages/assets/AssetsMobilePage'
import RecentlyWatched, {
  Asset
} from '../../components/RecentlyWatched/RecentlyWatched'
import GainersLosersTabs from '../../components/GainersAndLosers/GainersLosersTabs'
import styles from './ChartSidecar.module.scss'

function toggleSidecard ({ currentTarget }) {
  currentTarget.parentNode.classList.toggle(styles.opened)
}

const ChartSidecar = ({ onSlugSelect }) => {
  const [openedList, setOpenedList] = useState()

  const assetsRenderer = ({ key, index, style }) => {
    const { project } = openedList.listItems[index]
    return (
      <div key={key} style={style}>
        <Asset project={project} onClick={onSlugSelect} />
      </div>
    )
  }

  return (
    <div className={cx(styles.wrapper, styles.opened)}>
      <Icon
        type='arrow-left-big'
        className={styles.toggle}
        onClick={toggleSidecard}
      />
      {openedList ? (
        <div className={cx(styles.content, styles.content_assets)}>
          <h2 className={styles.back} onClick={() => setOpenedList()}>
            <Icon type='arrow-left' /> Back
          </h2>
          <AssetsList
            items={openedList.listItems.map(({ project }) => project)}
            renderer={assetsRenderer}
            rowHeight={50}
          />
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.visible}>
            <RecentlyWatched
              className={styles.section}
              onProjectClick={onSlugSelect}
              onWatchlistClick={setOpenedList}
              classes={styles}
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
      )}
    </div>
  )
}

export default ChartSidecar
