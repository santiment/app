import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Categories from './Categories'
import { AssetsList } from '../../pages/Watchlists/AssetsMobilePage'
import RecentlyWatched, {
  Asset
} from '../../components/RecentlyWatched/RecentlyWatched'
import GainersLosersTabs from '../../components/GainersAndLosers/GainersLosersTabs'
import Footer from '../../components/Footer'
import styles from './ChartSidecar.module.scss'

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
        <Icon type='arrow-left' className={styles.backIcon} /> Back
      </h2>
      <AssetsList
        items={openedList.listItems.map(({ project }) => project)}
        renderer={assetsRenderer}
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
            classes={classes || styles}
            type='assets'
          />

          <section className={cx(styles.section, styles.sectionOffset)}>
            <h2 className={cx(styles.subtitle, classes.subTitle)}>Indices</h2>
            <Categories onClick={setOpenedList} classes={styles} />
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
