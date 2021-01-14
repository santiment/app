import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Panel from '@santiment-network/ui/Panel/Panel'
import Button from '@santiment-network/ui/Button'
import { useRecentWatchlists } from '../../../ducks/Watchlists/gql/hooks'
import { useFeaturedWatchlists } from '../../../ducks/Watchlists/gql/queries'
import WatchlistsDropdown from './WatchlistsDropdown'
import { getRecentWatchlists } from '../../../utils/recent'
import { getSEOLinkFromIdAndTitle } from '../../../utils/url'
import styles from './MarketDropdown.module.scss'

const getWatchlistSEOLink = (id, name) =>
  '/watchlist/projects/' + getSEOLinkFromIdAndTitle(id, name)

const MarketDropdown = ({ activeLink }) => {
  const [watchlists = []] = useFeaturedWatchlists()

  const watchlistsIDs = getRecentWatchlists().filter(Boolean)
  const [recentWatchlists] = useRecentWatchlists(watchlistsIDs)

  return (
    <Panel>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <h3 className={styles.title}>Explore watchlists</h3>
          <div className={styles.listWrapper}>
            {watchlists.map(({ to, name, id }) => {
              const link = to || getWatchlistSEOLink(id, name)

              return (
                <Button
                  fluid
                  variant='ghost'
                  key={name}
                  as={Link}
                  to={link}
                  isActive={link === activeLink}
                  className={styles.btn}
                >
                  {name}
                </Button>
              )
            })}
          </div>
        </div>
        <div className={cx(styles.block, styles.list)}>
          {recentWatchlists && recentWatchlists.length > 0 && (
            <div className={styles.row}>
              <h3 className={styles.title}>Recent watched watchlists</h3>
              <div
                className={styles.listWrapper}
                style={{
                  minHeight:
                    recentWatchlists.length > 3
                      ? '100px'
                      : `${32 * recentWatchlists.length}px`
                }}
              >
                <div className={styles.recentList}>
                  {recentWatchlists.map(({ to, name, id }) => {
                    const link = to || getWatchlistSEOLink(id, name)

                    return (
                      <Button
                        fluid
                        variant='ghost'
                        key={name}
                        as={Link}
                        to={link}
                        className={styles.btn}
                      >
                        {name}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          <h3 className={styles.title}>My watchlists</h3>
          <div className={styles.listWrapper}>
            <WatchlistsDropdown activeLink={activeLink} />
          </div>
        </div>
      </div>
    </Panel>
  )
}

export default MarketDropdown
