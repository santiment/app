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

const RecentlyWatched = ({
  className = '',
  assets,
  watchlists,
  onProjectClick
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
          <>
            <h2 className={styles.title}>Recently watched assets</h2>
            {assets.map(project => {
              const {
                name,
                ticker,
                priceUsd,
                percentChange24h,
                coinmarketcapId
              } = project
              return (
                <div
                  className={styles.item}
                  key={coinmarketcapId}
                  onClick={() => onProjectClick(project)}
                >
                  <div className={styles.group}>
                    <ProjectIcon size={20} name={name} ticker={ticker} />
                    <h3 className={styles.name}>
                      {name} <span className={styles.ticker}>{ticker}</span>
                    </h3>
                  </div>
                  <div className={styles.group}>
                    <h4 className={styles.price}>
                      {priceUsd
                        ? formatNumber(priceUsd, { currency: 'USD' })
                        : 'No data'}
                    </h4>
                    <PercentChanges
                      changes={percentChange24h}
                      className={styles.change}
                    />
                  </div>
                </div>
              )
            })}
          </>
        )}
        {hasWatchlists && (
          <>
            <h2 className={styles.title}>Recently watched watchlists</h2>
            {watchlists.map(watchlist => (
              <WatchlistCard
                key={watchlist.name}
                name={watchlist.name}
                to={getWatchlistLink(watchlist)}
                slugs={watchlist.listItems.map(({ project }) => project.slug)}
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
