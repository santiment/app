import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import qs from 'query-string'
import { getOrigin } from '../../utils/utils'
import { useComparingAssets } from './Screener'
import PageLoader from '../../components/Loader/PageLoader'
import { upperCaseFirstLetter } from '../../utils/formatting'
import GetAssets from '../../ducks/Watchlists/Widgets/Table/GetAssets'
import TopPanel from '../../ducks/Watchlists/Widgets/TopPanel/Watchlist'
import AssetsTable from '../../ducks/Watchlists/Widgets/Table/AssetsTable'
import { getHelmetTags, getWatchlistName } from '../../ducks/Watchlists/utils'
import AssetsTemplates from '../../ducks/Watchlists/Widgets/Table/AssetsTemplates'
import { ASSETS_TABLE_COLUMNS } from '../../ducks/Watchlists/Widgets/Table/columns'
import WatchlistPriceWidget from './WatchlistPriceWidget/WatchlistPriceWidget'
import styles from './Watchlist.module.scss'

const WatchlistPage = props => {
  const [filteredItems, setFilteredItems] = useState(null)
  const [filterType, setFilterType] = useState(null)
  const [currentItems, setCurrentItems] = useState([])
  const { name } = qs.parse(props.location.search)

  const { type } = props

  const isList = type === 'list'
  const { title, description } = getHelmetTags(isList, name)

  function toggleAssetsFiltering (assets, type) {
    if (type === filterType) {
      setFilterType(null)
      setFilteredItems(null)
    } else {
      setFilterType(type)
      setFilteredItems(assets)
    }
  }

  const { comparingAssets, addAsset, cleanAll } = useComparingAssets()

  return (
    <div className={('page', styles.watchlist)}>
      <Helmet>
        <link rel='canonical' href={`${getOrigin()}/assets`} />
        <title>{title}</title>
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
      </Helmet>
      <GetAssets
        {...props}
        type={type}
        render={Assets => {
          const title = getWatchlistName(props)
          const {
            typeInfo: { listId },
            isLoading,
            isCurrentUserTheAuthor,
            isPublicWatchlist,
            items = [],
            trendingAssets = [],
            isMonitored
          } = Assets

          if (items !== currentItems) {
            setCurrentItems(items)
            setFilteredItems(null)
            setFilterType(null)
          }

          return (
            <>
              <TopPanel
                name={upperCaseFirstLetter(
                  (props.watchlist || {}).name || props.name
                )}
                id={listId}
                assets={items}
                watchlist={props.watchlist}
                isMonitored={isMonitored}
                isAuthor={isCurrentUserTheAuthor}
                className={styles.top}
              />
              {isLoading && <PageLoader />}

              {!isLoading && items.length > 0 && (
                <>
                  <WatchlistPriceWidget
                    type={type}
                    filterType={filterType}
                    listId={listId}
                    items={items}
                    toggleAssetsFiltering={toggleAssetsFiltering}
                    trendingAssets={trendingAssets}
                  />

                  <AssetsTable
                    Assets={Assets}
                    watchlist={props.watchlist}
                    filterType={filterType}
                    items={filteredItems || items}
                    goto={props.history.push}
                    type='watchlist'
                    preload={props.preload}
                    listName={title}
                    allColumns={ASSETS_TABLE_COLUMNS}
                    compareSettings={{
                      comparingAssets,
                      addAsset,
                      cleanAll
                    }}
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

export default WatchlistPage
