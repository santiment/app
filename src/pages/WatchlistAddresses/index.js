import React from 'react'
import { Redirect } from 'react-router-dom'
import {
  useAddressWatchlist,
  useIsWatchlistAuthor,
  useAddressWatchlistItems
} from './hooks'
import Page from '../../ducks/Page'
import { getIdFromSEOLink } from '../../utils/url'
import WatchlistAddressesTable from '../../ducks/WatchlistAddressesTable'
import PageLoader from '../../components/Loader/PageLoader'
import styles from './index.module.scss'
import BaseActions from '../../ducks/Watchlists/Widgets/TopPanel/WatchlistBaseActions'

const WatchlistAddress = ({ match }) => {
  const { watchlist, isLoading } = useAddressWatchlist(
    getIdFromSEOLink(match.params.nameId)
  )
  const isAuthor = useIsWatchlistAuthor(watchlist)
  const items = useAddressWatchlistItems(watchlist)

  if (isLoading) return <PageLoader />
  if (!watchlist.id) return <Redirect to='/' />

  const { id, name } = watchlist

  return (
    <Page
      className={styles.wrapper}
      headerClassName={styles.header}
      isWithPadding={false}
      title={watchlist.name}
      actions={
        <BaseActions
          watchlist={watchlist}
          isAuthor={isAuthor}
          name={name}
          id={id}
        />
      }
    >
      <WatchlistAddressesTable
        items={items}
        watchlist={watchlist}
        isLoading={isLoading}
      />
    </Page>
  )
}

export default WatchlistAddress
