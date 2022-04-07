import React from 'react'
import cx from 'classnames'
import Panel from '@santiment-network/ui/Panel/Panel'
import Item from './Item'
import { getBlockMinHeight } from '../utils'
import WatchlistsDropdown from './WatchlistsDropdown'
import { getRecentWatchlists } from '../../../utils/recent'
import {
  getAddressesWatchlistLink,
  getProjectsWatchlistLink,
  getWatchlistLink,
} from '../../../ducks/Watchlists/url'
import { BLOCKCHAIN_ADDRESS } from '../../../ducks/Watchlists/detector'
import { useRecentWatchlists } from '../../../ducks/Watchlists/gql/hooks'
import { useFeaturedWatchlists } from '../../../ducks/Watchlists/gql/lists/hooks'
import styles from './MarketDropdown.module.scss'

const MarketDropdown = ({ activeLink }) => {
  const [watchlists] = useFeaturedWatchlists()
  const [addressWatchlists] = useFeaturedWatchlists(BLOCKCHAIN_ADDRESS)
  const watchlistsIDs = getRecentWatchlists().filter(Boolean)
  const [recentWatchlists] = useRecentWatchlists(watchlistsIDs)

  return (
    <Panel>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <h3 className={styles.title}>Explore watchlists</h3>
          <div className={styles.listWrapper}>
            {watchlists.map((list, idx) => (
              <Item
                key={idx}
                name={list.name}
                link={getProjectsWatchlistLink(list)}
                activeLink={activeLink}
              />
            ))}
          </div>
        </div>
        <div className={cx(styles.block, styles.list)}>
          {recentWatchlists && recentWatchlists.length > 0 && (
            <div className={styles.row}>
              <h3 className={styles.title}>Recently viewed watchlists</h3>
              <div
                className={styles.listWrapper}
                style={{ minHeight: getBlockMinHeight(recentWatchlists) }}
              >
                <div className={styles.recentList}>
                  {recentWatchlists.map((list, idx) => (
                    <Item
                      key={idx}
                      name={list.name}
                      link={getWatchlistLink(list)}
                      activeLink={activeLink}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <h3 className={styles.title}>My watchlists</h3>
          <div className={styles.listWrapper}>
            <WatchlistsDropdown activeLink={activeLink} />
          </div>
        </div>
        <div className={styles.block}>
          <h3 className={styles.title}>Explore address watchlists</h3>
          <div className={styles.listWrapper}>
            {addressWatchlists.map((list, idx) => (
              <Item
                key={idx}
                name={list.name}
                link={getAddressesWatchlistLink(list)}
                activeLink={activeLink}
              />
            ))}
          </div>
        </div>
      </div>
    </Panel>
  )
}

export default MarketDropdown
