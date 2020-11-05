import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import qs from 'query-string'
import Panel from '@santiment-network/ui/Panel/Panel'
import { getOrigin } from '../../utils/utils'
import { getHelmetTags, getWatchlistName } from '../../ducks/Watchlists/utils'
import PageLoader from '../../components/Loader/PageLoader'
import GetAssets from '../../ducks/Watchlists/Widgets/Table/GetAssets'
import AssetsTable from '../../ducks/Watchlists/Widgets/Table/AssetsTable'
import AssetsTemplates from '../../ducks/Watchlists/Widgets/Table/AssetsTemplates'
import { RANGES } from '../../ducks/Watchlists/Widgets/WatchlistOverview/constants'
import { ASSETS_TABLE_COLUMNS } from '../../ducks/Watchlists/Widgets/Table/columns'
import GetWatchlistHistory from '../../ducks/Watchlists/Widgets/WatchlistOverview/WatchlistHistory/GetWatchlistHistory'
import WatchlistAnomalies from '../../ducks/Watchlists/Widgets/WatchlistOverview/WatchlistAnomalies/WatchlistAnomalies'
import TopPanel from '../../ducks/Watchlists/Widgets/TopPanel/Watchlist'
import styles from './Watchlist.module.scss'
import { useComparingAssets } from './Screener'

const WatchlistPage = props => {
  const [pointer, setPointer] = useState(1)
  const [range, setRange] = useState(RANGES[pointer])
  const [filteredItems, setFilteredItems] = useState(null)
  const [filterType, setFilterType] = useState(null)
  const [currentItems, setCurrentItems] = useState([])
  const { name } = qs.parse(props.location.search)
  const isList = props.type === 'list'
  const { title, description } = getHelmetTags(isList, name)

  const changeRange = () => {
    const newPointer = pointer === RANGES.length - 1 ? 0 : pointer + 1
    setPointer(newPointer)
    setRange(RANGES[newPointer])
  }

  const toggleAssetsFiltering = (assets, type) => {
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
        type={props.type}
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
                name={title}
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
                  <Panel className={styles.overviewInfo}>
                    <GetWatchlistHistory
                      type={props.type}
                      range={range}
                      changeRange={changeRange}
                      assetsAmount={items.length}
                      top3={items.slice(0, 3)}
                      id={listId}
                    />
                    <WatchlistAnomalies
                      trends={trendingAssets}
                      range={range}
                      type={filterType}
                      assetsAmount={items.length}
                      changeRange={changeRange}
                      onFilterAssets={toggleAssetsFiltering}
                    />
                  </Panel>

                  <AssetsTable
                    Assets={Assets}
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
