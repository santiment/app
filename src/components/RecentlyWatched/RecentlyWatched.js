import React, { useEffect } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ProjectIcon from '../ProjectIcon'
import PercentChanges from '../PercentChanges'
import WatchlistCard from '../Watchlists/WatchlistCard'
import { store } from '../../index'
import {
  RECENT_ASSETS_FETCH,
  RECENT_WATCHLISTS_FETCH
} from '../../actions/types'
import { formatNumber } from '../../utils/formatting'
import { getWatchlistLink } from '../../ducks/Watchlists/watchlistUtils'
import styles from './RecentlyWatched.module.scss'

export const Asset = ({ project, classes = {}, onClick }) => {
  const { name, ticker, priceUsd, percentChange24h, coinmarketcapId } = project
  const res = onClick
    ? { Component: 'div', props: { onClick: () => onClick(project) } }
    : { Component: Link, props: { to: `/projects/${coinmarketcapId}` } }
  return (
    <res.Component className={cx(styles.item, classes.asset)} {...res.props}>
      <div className={styles.group}>
        <ProjectIcon size={20} name={name} ticker={ticker} />
        <h3 className={cx(styles.name, classes.asset__name)}>
          {name} <span className={styles.ticker}>{ticker}</span>
        </h3>
      </div>
      <div className={styles.group}>
        <h4 className={styles.price}>
          {priceUsd ? formatNumber(priceUsd, { currency: 'USD' }) : 'No data'}
        </h4>
        <PercentChanges changes={percentChange24h} className={styles.change} />
      </div>
    </res.Component>
  )
}

const RecentlyWatched = ({
  className = '',
  assets,
  watchlists,
  onProjectClick,

  onWatchlistClick,
  classes = {}
}) => {
  useEffect(() => {
    store.dispatch({ type: RECENT_ASSETS_FETCH })
    store.dispatch({ type: RECENT_WATCHLISTS_FETCH })
  }, [])

  const hasAssets = assets.length > 0
  const hasWatchlists = watchlists.length > 0
  return (
    (hasAssets || hasWatchlists) && (
      <section className={cx(className, styles.wrapper)}>
        {hasAssets && (
          <div className={styles.recentAssets}>
            <h2 className={styles.title}>Recently watched assets</h2>
            {assets.map(project => (
              <Asset
                key={project.slug}
                project={project}
                onClick={onProjectClick}
                classes={classes}
              />
            ))}
          </div>
        )}
        {hasWatchlists && (
          <>
            <h2 className={styles.title}>Recently watched watchlists</h2>
            {watchlists.map(watchlist => (
              <WatchlistCard
                key={watchlist.name}
                watchlist={watchlist}
                name={watchlist.name}
                to={getWatchlistLink(watchlist)}
                slugs={watchlist.listItems.map(({ project }) => project.slug)}
                onClick={onWatchlistClick}
              />
            ))}
          </>
        )}
      </section>
    )
  )
}

const mapStateToProps = ({ recents }) => ({
  assets: recents.assets.filter(Boolean),
  watchlists: recents.watchlists.filter(Boolean)
})

export default connect(mapStateToProps)(RecentlyWatched)
