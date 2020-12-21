import React from 'react'
import Actions from './Actions'
import {
  useAddressWatchlist,
  useIsWatchlistAuthor,
  useAddressWatchlistItems
} from './hooks'
import Page from '../../ducks/Page'
import WatchlistAddressesTable from '../../ducks/WatchlistAddressesTable'
import PageLoader from '../../components/Loader/PageLoader'
import { getIdFromSEOLink } from '../../utils/url'
import styles from './index.module.scss'

const WatchlistAddress = ({ match }) => {
  const { watchlist, isLoading } = useAddressWatchlist(
    getIdFromSEOLink(match.params.nameId)
  )
  const isAuthor = useIsWatchlistAuthor(watchlist)
  const items = useAddressWatchlistItems(watchlist)

  if (isLoading) return <PageLoader />

  console.log(watchlist)

  return (
    <Page
      className={styles.wrapper}
      headerClassName={styles.header}
      isWidthPadding={false}
      title={watchlist.name}
      actions={<Actions watchlist={watchlist} isAuthor={isAuthor} />}
    >
      {/* <div className='top'>
          <SaveAs watchlist={watchlist} items={items} />
          <Copy watchlist={watchlist} />
          </div> */}
      <WatchlistAddressesTable
        items={items}
        watchlist={watchlist}
        isLoading={isLoading}
      />
    </Page>
  )
}

export default WatchlistAddress
