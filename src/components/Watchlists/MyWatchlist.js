import React from 'react'
import { Icon, Button } from '@santiment-network/ui'
import WatchlistCard from './WatchlistCard'
import GetWatchlists from './../../ducks/Watchlists/GetWatchlists'
import { getWatchlistLink } from './../../ducks/Watchlists/watchlistUtils'
import { DesktopOnly } from './../../components/Responsive'
import Row from './../../components/Row'
import styles from './Watchlist.module.scss'

const MyWatchlist = () => (
  <div className={styles.wrapper}>
    <DesktopOnly>
      <div className={styles.header}>
        <h4>My watchlists</h4>
        <Button border>
          <Icon type='plus-round' />
          &nbsp; New watchlist
        </Button>
      </div>
    </DesktopOnly>
    <Row>
      <GetWatchlists
        render={({ isWatchlistsLoading, watchlists }) =>
          watchlists
            .filter(({ listItems }) => Boolean(listItems.length))
            .map(watchlist => (
              <WatchlistCard
                key={watchlist.id}
                name={watchlist.name}
                to={getWatchlistLink(watchlist)}
                isPublic={watchlist.isPublic}
                slugs={watchlist.listItems.map(({ project }) => project.slug)}
              />
            ))
        }
      />
    </Row>
  </div>
)

export default MyWatchlist
