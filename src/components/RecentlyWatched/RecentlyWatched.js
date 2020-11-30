import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import ProjectIcon from '../ProjectIcon/ProjectIcon'
import PercentChanges from '../PercentChanges'
import WatchlistCard from '../../ducks/Watchlists/Cards/WatchlistCard'
import Skeleton from '../Skeleton/Skeleton'
import { getRecentAssets, getRecentWatchlists } from '../../utils/recent'
import { formatNumber } from '../../utils/formatting'
import { getWatchlistLink } from '../../ducks/Watchlists/utils'
import { useRecentWatchlists } from './../../ducks/Watchlists/gql/hooks'
import { useRecentAssets } from '../../hooks/recents'
import styles from './RecentlyWatched.module.scss'

export const Asset = ({ project, classes = {}, onClick }) => {
  const {
    name,
    ticker,
    priceUsd,
    percentChange7d,
    logoUrl,
    darkLogoUrl,
    slug
  } = project
  const res = onClick
    ? { Component: 'div', props: { onClick: () => onClick(project) } }
    : { Component: Link, props: { to: `/projects/${slug}` } }
  return (
    <res.Component className={cx(styles.item, classes.asset)} {...res.props}>
      <div className={styles.group}>
        <ProjectIcon
          size={20}
          slug={slug}
          logoUrl={logoUrl}
          darkLogoUrl={darkLogoUrl}
        />
        <h3 className={cx(styles.name, classes.asset__name)}>
          {name} <span className={styles.ticker}>{ticker}</span>
        </h3>
      </div>
      <div className={styles.group}>
        <h4 className={styles.price}>
          {priceUsd ? formatNumber(priceUsd, { currency: 'USD' }) : 'No data'}
        </h4>
        <PercentChanges changes={percentChange7d} className={styles.change} />
      </div>
    </res.Component>
  )
}

const RecentlyWatched = ({
  className = '',
  onProjectClick,
  type,
  classes = {}
}) => {
  const isShowAssets = type === 'assets' || !type
  const isShowWatchlists = type === 'watchlists' || !type

  const watchlistsIDs = isShowWatchlists
    ? getRecentWatchlists().filter(Boolean)
    : []
  const assetsSlugs = isShowAssets ? getRecentAssets().filter(Boolean) : []

  const assetsNumber = assetsSlugs.length
  const watchlistsNumber = watchlistsIDs.length

  const [watchlists] = useRecentWatchlists(watchlistsIDs)
  const [assets] = useRecentAssets(assetsSlugs)

  const hasAssets = assets && assets.length > 0
  const hasWatchlists = watchlists && watchlists.length > 0

  return (
    <>
      {isShowAssets && (assets ? hasAssets : assetsNumber > 0) && (
        <div className={cx(className, styles.wrapper)}>
          <h2 className={cx(styles.title, classes.subTitle)}>
            Recently watched assets
          </h2>
          <Skeleton
            className={styles.skeleton}
            show={!hasAssets}
            repeat={assets ? assets.length : assetsNumber}
          />
          {assets &&
            assets.map(project => (
              <Asset
                key={project.slug}
                project={project}
                onClick={onProjectClick}
                classes={classes}
              />
            ))}
        </div>
      )}
      {isShowWatchlists && (watchlists ? hasWatchlists : watchlistsNumber > 0) && (
        <div className={cx(className, styles.wrapper)}>
          <h2 className={cx(styles.title, classes.subTitle)}>
            Recently watched watchlists
          </h2>
          <div className={styles.watchlistsWrapper}>
            <Skeleton
              className={styles.skeleton}
              show={!hasWatchlists}
              repeat={watchlists ? watchlists.length : watchlistsNumber}
            />
            {watchlists &&
              watchlists.map(watchlist => (
                <WatchlistCard
                  isSimplifiedView={true}
                  key={watchlist.name}
                  to={getWatchlistLink(watchlist)}
                  {...watchlist}
                />
              ))}
          </div>
        </div>
      )}
    </>
  )
}

export default RecentlyWatched
