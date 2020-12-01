import React, { useState } from 'react'
import cx from 'classnames'
import throttle from 'lodash.throttle'
import List from 'react-virtualized/dist/commonjs/List'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import Label from '@santiment-network/ui/Label'
import GetAssets, {
  SORT_TYPES
} from '../../ducks/Watchlists/Widgets/Table/GetAssets'
import { useWatchlist } from '../../ducks/Watchlists/gql/hooks'
import { getWatchlistId } from '../../ducks/Watchlists/utils'
import { RANGES } from '../../ducks/Watchlists/Widgets/WatchlistOverview/constants'
import { getWatchlistName } from '../../ducks/Watchlists/utils'
import { addRecentWatchlists, removeRecentWatchlists } from '../../utils/recent'
import AssetCard from '../../ducks/Watchlists/Widgets/Table/AssetCard'
import AssetsTemplates from '../../ducks/Watchlists/Widgets/Table/AssetsTemplates'
import WatchlistActions from '../../ducks/Watchlists/Widgets/TopPanel/WatchlistMobileActions'
import WatchlistAnomalies from '../../ducks/Watchlists/Widgets/WatchlistOverview/WatchlistAnomalies/WatchlistAnomalies'
import PageLoader from '../../components/Loader/PageLoader'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import { usePriceGraph } from '../../ducks/Watchlists/Widgets/Table/PriceGraph/hooks'
import { normalizeGraphData } from '../../ducks/Watchlists/Widgets/Table/PriceGraph/utils'
import styles from './AssetsMobilePage.module.scss'

// NOTE(haritonasty): predefined heights needed for calculate react-virtualized height.
// Pls, upd here, if you change height of any elements on this page
const BOTTOM_HEIGHT = 60
const HEADER_HEIGHT = 62
const TABLE_LABELS_HEIGHT = 27
const CLOSED_ANOMALIES_HEIGHT = 48 + 20
const OPENED_ANOMALIES_HEIGHT = 105 + 20
const CHOOSED_ANOMALIES_HEIGHT = 137 + 20

const INITIAL_REMAINING_HEIGHT =
  BOTTOM_HEIGHT + HEADER_HEIGHT + TABLE_LABELS_HEIGHT

const ROW_HEIGHT = 60

const AssetsMobilePage = props => {
  const id = getWatchlistId(props.location.search)
  const [watchlist = {}] = useWatchlist({ id })
  const [pointer, setPointer] = useState(1)
  const [range, setRange] = useState(RANGES[pointer])
  const [filteredItems, setFilteredItems] = useState(null)
  const [filterType, setFilterType] = useState(null)
  const [currentItems, setCurrentItems] = useState([])
  const [isOpenAnomalies, setIsOpenAnomalies] = useState(false)
  const [remainingHeight, setRemainingHeight] = useState(
    INITIAL_REMAINING_HEIGHT
  )

  const [topRow, setTopRow] = useState(0)

  const changeRange = () => {
    const newPointer = pointer === RANGES.length - 1 ? 0 : pointer + 1
    setPointer(newPointer)
    setRange(RANGES[newPointer])
  }

  const toggleAssetsFiltering = (assets, type) => {
    if (type === filterType) {
      setFilterType(null)
      setFilteredItems(null)
      setRemainingHeight(INITIAL_REMAINING_HEIGHT + OPENED_ANOMALIES_HEIGHT)
    } else {
      setFilterType(type)
      setFilteredItems(assets)
      setRemainingHeight(INITIAL_REMAINING_HEIGHT + CHOOSED_ANOMALIES_HEIGHT)
    }
  }

  const handleAnomaliesState = () => {
    if (filterType) toggleAssetsFiltering(null, null)
    const isOpen = !isOpenAnomalies
    setIsOpenAnomalies(isOpen)
    setRemainingHeight(
      INITIAL_REMAINING_HEIGHT +
        (isOpen ? OPENED_ANOMALIES_HEIGHT : CLOSED_ANOMALIES_HEIGHT)
    )
  }

  return (
    <div className={cx('page', styles.wrapper)}>
      <GetAssets
        {...props}
        sortBy={SORT_TYPES.marketcap}
        type={props.type}
        render={({
          typeInfo: { listId },
          isLoading,
          isCurrentUserTheAuthor,
          isPublicWatchlist,
          items = [],
          isMonitored,
          trendingAssets = []
        }) => {
          if (items !== currentItems) {
            setCurrentItems(items)
            setFilteredItems(null)
            setFilterType(null)
            setRemainingHeight(
              INITIAL_REMAINING_HEIGHT +
                (trendingAssets.length > 0 && CLOSED_ANOMALIES_HEIGHT)
            )
          }

          const title = getWatchlistName(props)

          if (items.length && (isCurrentUserTheAuthor || isPublicWatchlist)) {
            addRecentWatchlists(listId)
          } else {
            // NOTE(vanguard): it's needed because when visiting empty/private watchlist all props stays the same for some time
            // but listId is changed immediatly which leads to adding listId to recents
            removeRecentWatchlists(listId)
          }

          const { scrollPosition } = window.history.state || {}
          const scrollToIndex = scrollPosition || 0

          const saveScrollPosition = () => {
            window.history.replaceState(
              { scrollPosition: topRow },
              'scrollPosition'
            )
          }

          const isWatchlist = window.location.search.includes('@')

          const backRoute = isWatchlist ? '/watchlists' : '/assets'

          return isLoading ? (
            <>
              <MobileHeader title={title} backRoute={backRoute} />
              <PageLoader />
            </>
          ) : (
            <>
              <MobileHeader
                title={title}
                backRoute={backRoute}
                rightActions={
                  <WatchlistActions
                    watchlist={watchlist}
                    isDesktop={false}
                    isAuthor={isCurrentUserTheAuthor}
                    id={listId}
                    title={title}
                    items={items}
                    isMonitored={isMonitored}
                  />
                }
              />
              {items.length > 0 && (
                <>
                  <WatchlistAnomalies
                    trends={trendingAssets}
                    isDesktop={false}
                    range={range}
                    type={filterType}
                    assetsAmount={items.length}
                    changeRange={changeRange}
                    toggleOpenAnomalies={handleAnomaliesState}
                    isOpen={isOpenAnomalies}
                    onFilterAssets={toggleAssetsFiltering}
                  />
                  <div className={styles.headings}>
                    <Label accent='casper'>Coin</Label>
                    <Label accent='casper'>Price, 24h</Label>
                  </div>
                  <div
                    className={styles.assetsList}
                    style={{ '--remaining-height': `${remainingHeight}px` }}
                  >
                    <AssetsList
                      items={filteredItems || items}
                      saveScrollPosition={saveScrollPosition}
                      initialIndex={scrollToIndex}
                      onAssetsListScroll={({ scrollTop }) =>
                        setTopRow(Math.ceil(scrollTop / ROW_HEIGHT))
                      }
                    />
                  </div>
                </>
              )}

              <AssetsTemplates
                items={items}
                isAuthor={isCurrentUserTheAuthor}
                isPublic={isPublicWatchlist}
                listId={listId}
                title={title}
              />
            </>
          )
        }}
      />
    </div>
  )
}

export const AssetsList = ({
  items,
  renderer,
  rowHeight = ROW_HEIGHT,
  initialIndex,
  saveScrollPosition,
  onAssetsListScroll = () => {}
}) => {
  const slugs = items.map(item => item.slug)
  const [savedLastIndex, setSavedLastIndex] = useState(30)
  const [visibleItems, setVisibleItems] = useState(
    slugs.slice(0, savedLastIndex)
  )
  const [graphData] = usePriceGraph({ slugs: visibleItems })
  const normalizedItems = normalizeGraphData(graphData, items)

  const rowRenderer =
    renderer ||
    function ({ key, index, style }) {
      const asset = normalizedItems[index]
      return (
        <div key={key} style={style}>
          <AssetCard {...asset} onAssetClick={saveScrollPosition} />
        </div>
      )
    }

  return (
    <div className={styles.wrapperList}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowHeight={rowHeight}
            rowCount={items.length}
            overscanRowCount={5}
            onScroll={throttle(onAssetsListScroll, 300)}
            scrollToIndex={initialIndex}
            scrollToAlignment={'start'}
            rowRenderer={rowRenderer}
            onRowsRendered={({
              overscanStartIndex,
              overscanStopIndex,
              startIndex
            }) => {
              if (savedLastIndex - startIndex < 5) {
                const newLastIndex = overscanStopIndex + 30
                setSavedLastIndex(newLastIndex)
                setVisibleItems(slugs.slice(startIndex, newLastIndex))
              }
            }}
          />
        )}
      </AutoSizer>
    </div>
  )
}

export default AssetsMobilePage
