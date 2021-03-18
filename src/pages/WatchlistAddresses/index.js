import React from 'react'
import { Redirect } from 'react-router-dom'
import withSizes from 'react-sizes'
import { useAddressWatchlist, useAddressWatchlistItems } from './hooks'
import Page from '../../ducks/Page'
import { getIdFromSEOLink } from '../../utils/url'
import WatchlistAddressesTable from '../../ducks/WatchlistAddressesTable'
import PageLoader from '../../components/Loader/PageLoader'
import { mapSizesToProps } from '../../utils/withSizes'
import TopPanel from '../../ducks/Watchlists/Widgets/TopPanel'
import { BLOCKCHAIN_ADDRESS } from '../../ducks/Watchlists/detector'
import styles from './index.module.scss'

const WatchlistAddress = ({ match, isPhone }) => {
  const { watchlist, isLoading } = useAddressWatchlist(
    getIdFromSEOLink(match.params.nameId)
  )
  const items = useAddressWatchlistItems(watchlist)

  if (isLoading) return <PageLoader />
  if (!watchlist.id) return <Redirect to='/' />

  const AppElem = document.getElementsByClassName('App')[0]

  if (AppElem) {
    AppElem.classList.add('list-container')
  }

  return (
    <>
      {isPhone ? (
        <Page
          className={styles.wrapper}
          headerClassName={styles.header}
          isWithPadding={false}
          title={watchlist.name}
        />
      ) : (
        <TopPanel
          watchlist={watchlist}
          className={styles.wrapper}
          type={BLOCKCHAIN_ADDRESS}
        />
      )}
      <WatchlistAddressesTable
        items={items}
        watchlist={watchlist}
        isLoading={isLoading}
      />
    </>
  )
}

export default withSizes(mapSizesToProps)(WatchlistAddress)
