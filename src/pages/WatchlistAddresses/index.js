import React, { useState, useMemo } from 'react'
import Table from './Table'
import Actions from './Actions'
import Page from '../../ducks/Page'
import {
  useAddressWatchlist,
  useIsWatchlistAuthor,
  useAddressWatchlistItems
} from './hooks'
import PageLoader from '../../components/Loader/PageLoader'
import styles from './index.module.scss'

import SaveAs from './SaveAs'
import Copy from './Copy'
import { parseUrl } from './url'

const WatchlistAddress = ({ match }) => {
  const { watchlist, isLoading } = useAddressWatchlist(parseUrl(match.params))
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
      <Table items={items} watchlist={watchlist} isLoading={isLoading} />
    </Page>
  )
}

export default WatchlistAddress
