import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import qs from 'query-string'
import { CSVLink } from 'react-csv'
import Button from '@santiment-network/ui/Button'
import { getOrigin } from '../../utils/utils'
import {
  getHelmetTags,
  getTableTitle,
  isNotSafari,
  normalizeCSV
} from './utils'
import { RANGES } from '../../components/WatchlistHistory/constants'
import GetAssets from './GetAssets'
import AssetsTable from './AssetsTable'
import HelpPopupAssets from './HelpPopupAssets'
import ShareModalTrigger from '../../components/Share/ShareModalTrigger'
import GetWatchlistHistory from '../../components/WatchlistHistory/GetWatchlistHistory'
import WatchlistEditTrigger from '../../components/WatchlistEdit/WatchlistEditTrigger'
import WatchlistContextMenu from './WatchlistContextMenu'
import AssetsTemplates from './AssetsTemplates'
import PageLoader from '../../components/Loader/PageLoader'

import styles from '../../components/Watchlists/Watchlist.module.scss'
import './Assets.css'

const AssetsPage = props => {
  const [pointer, setPointer] = useState(1)
  const [range, setRange] = useState(RANGES[pointer])
  const { name } = qs.parse(props.location.search)
  const isList = props.type === 'list'
  const { title, description } = getHelmetTags(isList, name)

  const changeRange = () => {
    const newPointer = pointer === RANGES.length - 1 ? 0 : pointer + 1
    setPointer(newPointer)
    setRange(RANGES[newPointer])
  }

  return (
    <div className='page projects-table'>
      <Helmet>
        <link rel='canonical' href={`${getOrigin()}/assets`} />
        <title>{title}</title>
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
      </Helmet>
      <GetAssets
        {...props}
        type={props.type}
        render={Assets => {
          const title = getTableTitle(props)
          const {
            typeInfo: { listId },
            isLoading,
            isCurrentUserTheAuthor,
            isPublicWatchlist,
            items = []
          } = Assets

          return (
            <>
              <div className='page-head page-head-projects'>
                <div className='page-head-projects__left'>
                  <h1 className={styles.heading}>{title}</h1>
                  <HelpPopupAssets />
                </div>
                <div className='page-head-projects__right'>
                  {isList && props.location.hash !== '#shared' && (
                    <>
                      <ShareModalTrigger
                        shareLink={window.location.href + '#shared'}
                      />
                      {isCurrentUserTheAuthor && (
                        <WatchlistEditTrigger
                          name={title}
                          id={listId}
                          assets={items}
                        />
                      )}
                    </>
                  )}

                  {!isList && isNotSafari && items && items.length > 0 && (
                    <CSVLink
                      data={normalizeCSV(items)}
                      filename={`${title}.csv`}
                      target='_blank'
                    >
                      <Button variant='flat' isActive>
                        Download CSV
                      </Button>
                    </CSVLink>
                  )}
                  {isList && (
                    <WatchlistContextMenu
                      isAuthor={isCurrentUserTheAuthor}
                      id={listId}
                      assets={items}
                      type={props.type}
                      location={props.location}
                    />
                  )}
                </div>
              </div>
              {isLoading && <PageLoader />}

              {!isLoading && items.length > 0 && (
                <>
                  <GetWatchlistHistory
                    type={props.type}
                    range={range}
                    changeRange={changeRange}
                    assetsAmount={items.length}
                    top3={items.slice(0, 3)}
                    id={listId}
                  />
                  <AssetsTable
                    Assets={Assets}
                    goto={props.history.push}
                    preload={props.preload}
                    listName={title}
                  />
                </>
              )}
              {!isLoading && (
                <AssetsTemplates
                  items={items}
                  isAuthor={isCurrentUserTheAuthor}
                  isPublic={isPublicWatchlist}
                  listId={listId}
                  title={title}
                />
              )}
            </>
          )
        }}
      />
    </div>
  )
}

export default AssetsPage
