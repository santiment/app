import React from 'react'
import { Redirect } from 'react-router-dom'
import withSizes from 'react-sizes'
import { useAddressWatchlist } from './hooks'
import { getIdFromSEOLink } from '../../utils/url'
import WatchlistAddressesTable from '../../ducks/WatchlistAddressesTable'
import PageLoader from '../../components/Loader/PageLoader'
import { mapSizesToProps } from '../../utils/withSizes'
import TopPanel from '../../ducks/Watchlists/Widgets/TopPanel'
import TopBar from '../../ducks/Watchlists/Widgets/TopBar/TopBar'
import { BLOCKCHAIN_ADDRESS } from '../../ducks/Watchlists/detector'
import styles from './index.module.scss'

const WatchlistAddress = ({ match, isPhone, isDesktop }) => {
  const { watchlist, isLoading } = useAddressWatchlist(
    getIdFromSEOLink(match.params.nameId)
  )

  if (isLoading) return <PageLoader />
  if (!watchlist.id) return <Redirect to='/' />

  return (
    <>
      {!isPhone && (
        <>
          <TopBar entity={watchlist} type={BLOCKCHAIN_ADDRESS} />
          <TopPanel
            watchlist={watchlist}
            className={styles.wrapper}
            type={BLOCKCHAIN_ADDRESS}
          />
        </>
      )}
      <WatchlistAddressesTable
        watchlist={watchlist}
        isLoading={isLoading}
        isDesktop={isDesktop}
      />
    </>
  )
}

export default withSizes(mapSizesToProps)(WatchlistAddress)
