import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Categories from './Categories'
import { AssetsList } from '../../pages/assets/AssetsMobilePage'
import RecentlyWatched, {
  Asset
} from '../../components/RecentlyWatched/RecentlyWatched'
import GainersLosersTabs from '../../components/GainersAndLosers/GainersLosersTabs'
import SidecarExplanationTooltip from './SidecarExplanationTooltip'
import { ASSETS_SIDEBAR } from './data'
import styles from './ChartSidecar.module.scss'

const ChartSidecar = ({
  onSlugSelect,
  onSidebarToggleClick,
  isAdvancedView,
  classes,
  isWideChart
}) => {
  const [openedList, setOpenedList] = useState()
  const [shouldPreload, setShouldPreload] = useState()

  const wasPreloaded = shouldPreload !== undefined

  const assetsRenderer = ({ key, index, style }) => {
    const { project } = openedList.listItems[index]
    return (
      <div key={key} style={style}>
        <Asset project={project} onClick={onSlugSelect} />
      </div>
    )
  }

  function preloadData () {
    setShouldPreload(true)
  }

  useEffect(
    () => {
      if (!wasPreloaded) return

      const timer = setTimeout(() => {
        setShouldPreload(false)
      }, 2000)

      return () => clearTimeout(timer)
    },
    [wasPreloaded]
  )

  return (
    <div className={cx(styles.wrapper, isAdvancedView && styles.opened)}>
      <SidecarExplanationTooltip
        classes={{
          wrapper: cx(
            styles.toggle,
            isAdvancedView || classes.sidecar__toggle_assets,
            isWideChart && classes.sidecar__toggle_assets_wide
          )
        }}
      >
        <div
          className={styles.toggle__btn}
          onClick={() => onSidebarToggleClick(ASSETS_SIDEBAR)}
          onMouseOver={wasPreloaded ? undefined : preloadData}
        >
          <div className={styles.toggle__icons}>
            <Icon type='arrow-left' className={styles.toggle__arrow} />
            <Icon type='hamburger' className={styles.hamburger} />
          </div>
        </div>
      </SidecarExplanationTooltip>
      {!shouldPreload && !isAdvancedView ? null : openedList ? (
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
          <div className={styles.content__container}>
            <div className={styles.visible}>
              <RecentlyWatched
                className={styles.section}
                onProjectClick={onSlugSelect}
                onWatchlistClick={setOpenedList}
                classes={styles}
              />

              <section className={styles.section}>
                <h2 className={styles.subtitle}>Categories</h2>
                <Categories onClick={setOpenedList} />
              </section>
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
      )}
    </div>
  )
}

export default ChartSidecar
