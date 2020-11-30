import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Panel from '@santiment-network/ui/Panel/Panel'
import Button from '@santiment-network/ui/Button'
import {
  useFeaturedWatchlists,
  useRecentWatchlists
} from '../../../ducks/Watchlists/gql/hooks'
import WatchlistsDropdown from './WatchlistsDropdown'
import { getRecentWatchlists } from '../../../utils/recent'
import {
  BASIC_CATEGORIES,
  getWatchlistLink
} from '../../../ducks/Watchlists/utils'
import NewLabel from '../../NewLabel/NewLabel'
import styles from './MarketDropdown.module.scss'

const DASHBOARDS = [
  {
    name: 'Stablecoins',
    to: '/stablecoins',
    createdAt: '2020-10-01T00:00:00Z'
  },
  {
    name: 'Uniswap Protocol',
    to: '/uniswap-protocol',
    createdAt: '2020-11-01T00:00:00Z'
  },
  {
    name: 'Decentralized Exchanges',
    to: '/decentralized-exchanges',
    createdAt: '2020-11-03T00:00:00Z'
  },
  {
    name: 'Bitcoin Locked on Ethereum',
    to: '/bitcoin-locked-on-ethereum',
    createdAt: '2020-11-04T00:00:00Z'
  }
]

const MarketDropdown = ({ activeLink }) => {
  const [watchlists = []] = useFeaturedWatchlists()
  const categories = [...BASIC_CATEGORIES, ...watchlists]

  const watchlistsIDs = getRecentWatchlists().filter(Boolean)
  const [recentWatchlists] = useRecentWatchlists(watchlistsIDs)

  return (
    <Panel>
      <div className={styles.wrapper}>
        <div className={cx(styles.block, styles.list)}>
          <h3 className={styles.title}>Dashboards</h3>

          <div>
            {DASHBOARDS.map(({ to, name, createdAt }) => {
              const link = to

              return (
                <Button
                  fluid
                  variant='ghost'
                  key={name}
                  as={Link}
                  to={link}
                  isActive={link === activeLink}
                >
                  {[
                    <NewLabel
                      className={styles.new}
                      date={createdAt}
                      limitDays={14}
                      key='new'
                    />,
                    name
                  ]}
                </Button>
              )
            })}
          </div>
        </div>
        <div className={styles.block}>
          <h3 className={styles.title}>Explore watchlists</h3>
          <div>
            {categories.map(({ to, name, id }) => {
              const link = to || getWatchlistLink({ name, id })

              return (
                <Button
                  fluid
                  variant='ghost'
                  key={name}
                  as={Link}
                  to={link}
                  isActive={link === activeLink}
                >
                  {name}
                </Button>
              )
            })}
          </div>
        </div>
        <div className={cx(styles.block, styles.list)}>
          {recentWatchlists && recentWatchlists.length > 0 && (
            <>
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
                    const link = to || getWatchlistLink({ name, id })

                    return (
                      <Button
                        fluid
                        variant='ghost'
                        key={name}
                        as={Link}
                        to={link}
                      >
                        {name}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </>
          )}
          <h3 className={styles.title}>My watchlists</h3>
          <WatchlistsDropdown activeLink={activeLink} />
        </div>
      </div>
    </Panel>
  )
}

export default MarketDropdown
