import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Categories from './Categories'
import { AssetsList } from '../../pages/assets/AssetsMobilePage'
import RecentlyWatched, {
  Asset
} from '../../components/RecentlyWatched/RecentlyWatched'
import GainersLosersTabs from '../../components/GainersAndLosers/GainersLosersTabs'
import Footer from '../../components/Footer'
import { ASSETS_SIDEBAR } from './metrics/data'
import styles from './ChartSidecar.module.scss'

const ChartSidecar = ({
  onSlugSelect,
  onSidebarToggleClick,
  isAdvancedView,
  classes,
  isWideChart
}) => {
  const [shouldPreload, setShouldPreload] = useState()

  const wasPreloaded = shouldPreload !== undefined

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
      <div
        className={cx(
          styles.toggle,
          isAdvancedView || classes.sidecar__toggle_assets,
          !isAdvancedView && isWideChart && classes.sidecar__toggle_assets_wide
        )}
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
      </div>
      <SidecarItems
        hidden={!shouldPreload && !isAdvancedView}
        onSlugSelect={onSlugSelect}
        onProjectClick={onSlugSelect}
      />
    </div>
  )
}

export const SidecarItems = ({
  classes = {},
  hidden = false,
  onSlugSelect,
  onProjectClick,
  showFooter = false
}) => {
  const [openedList, setOpenedList] = useState()

  const assetsRenderer = ({ key, index, style }) => {
    const { project } = openedList.listItems[index]
    return (
      <div key={key} style={style}>
        <Asset project={project} onClick={onSlugSelect} classes={classes} />
      </div>
    )
  }

  return hidden ? null : openedList ? (
    <div
      className={cx(
        styles.content,
        styles.content_assets,
        classes.sidecarCategoryAssets
      )}
    >
      <h2
        className={cx(styles.back, classes.sidecarBackBtn)}
        onClick={() => setOpenedList()}
      >
        <Icon type='arrow-left' /> Back
      </h2>
      <AssetsList
        items={openedList.listItems.map(({ project }) => project)}
        renderer={assetsRenderer}
        rowHeight={50}
      />
      {showFooter && <Footer classes={styles} />}
    </div>
  ) : (
    <div className={cx(styles.content, classes.sidecarItems)}>
      <div
        className={cx(
          styles.content__container,
          classes.sidecarContentContainer
        )}
      >
        <div className={styles.visible}>
          <RecentlyWatched
            className={styles.section}
            onProjectClick={onSlugSelect}
            onWatchlistClick={setOpenedList}
            classes={classes || styles}
          />

          <section className={cx(styles.section, styles.sectionOffset)}>
            <h2 className={cx(styles.subtitle, classes.subTitle)}>Indices</h2>
            <Categories onClick={setOpenedList} />
          </section>
          <GainersLosersTabs
            className={styles.section}
            titleClassName={classes.subTitle}
            timeWindow='2d'
            size={8}
            onProjectClick={onProjectClick}
            classes={styles}
          />
          {showFooter && <Footer classes={styles} />}
        </div>
      </div>
    </div>
  )
}

export default ChartSidecar
