import React, { useState } from 'react'
import throttle from 'lodash.throttle'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import GetAssets from '../../ducks/Watchlists/Widgets/Table/GetAssets'
import AssetCard from '../../ducks/Watchlists/Widgets/Table/AssetCard'
import AssetsTemplates from '../../ducks/Watchlists/Widgets/Table/AssetsTemplates'
import Share from '../../ducks/Watchlists/Actions/Share'
import PageLoader from '../../components/Loader/PageLoader'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import IntervalsComponent from '../../components/IntervalsComponent/IntervalsComponent'
import { addRecentWatchlists, removeRecentWatchlists } from '../../utils/recent'
import { usePriceGraph } from '../../ducks/Watchlists/Widgets/Table/PriceGraph/hooks'
import { normalizeGraphData } from '../../ducks/Watchlists/Widgets/Table/PriceGraph/utils'
import styles from './AssetsMobilePage.module.scss'

const List = () => {}
const AutoSizer = () => {}

// NOTE(haritonasty): predefined heights needed for calculate react-virtualized height.
// Pls, upd here, if you change height of any elements on this page
const BOTTOM_HEIGHT = 83
const HEADER_HEIGHT = 73
const TABLE_LABELS_HEIGHT = 60

const INITIAL_REMAINING_HEIGHT = BOTTOM_HEIGHT + HEADER_HEIGHT + TABLE_LABELS_HEIGHT

const ROW_HEIGHT = 68

export const PRICE_RANGES = [
  { value: '1d', label: '24h' },
  { value: '7d', label: '7d' },
]

const AssetsMobilePage = (props) => {
  const { watchlist } = props
  const [priceRange, setPriceRange] = useState(PRICE_RANGES[1].value)
  const [filteredItems, setFilteredItems] = useState(null)
  const [currentItems, setCurrentItems] = useState([])
  const [remainingHeight, setRemainingHeight] = useState(INITIAL_REMAINING_HEIGHT)

  const [topRow, setTopRow] = useState(0)

  return (
    <div className={styles.wrapper}>
      <GetAssets
        {...props}
        type={props.type}
        render={({
          typeInfo: { listId },
          isLoading,
          isCurrentUserTheAuthor,
          isPublicWatchlist,
          items = [],
        }) => {
          if (items !== currentItems) {
            setCurrentItems(items)
            setFilteredItems(null)
            setRemainingHeight(INITIAL_REMAINING_HEIGHT)
          }

          const { name: title = 'My screener' } = watchlist || {}

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
            window.history.replaceState({ scrollPosition: topRow }, 'scrollPosition')
          }

          return isLoading ? (
            <>
              <MobileHeader title={title} />
              <PageLoader />
            </>
          ) : (
            <>
              <MobileHeader
                title={title}
                rightActions={
                  <Share watchlist={watchlist} isAuthor={isCurrentUserTheAuthor} isMobile />
                }
              />
              {items.length > 0 && (
                <>
                  <div className={cx(styles.headings, 'fluid row v-center justify')}>
                    <Label accent='casper' className='txt-m'>
                      Coin
                    </Label>
                    <div className='row v-center'>
                      <Label accent='casper' className='txt-m'>
                        Price
                      </Label>
                      <IntervalsComponent
                        defaultIndex={1}
                        ranges={PRICE_RANGES}
                        onChange={setPriceRange}
                        btnClassName={styles.intervalToggle}
                      />
                    </div>
                  </div>
                  <div
                    className={styles.assetsList}
                    style={{ '--remaining-height': `${remainingHeight}px` }}
                  >
                    <AssetsList
                      priceRange={priceRange}
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

              <AssetsTemplates items={items} watchlist={watchlist || {}} />
            </>
          )
        }}
      />
    </div>
  )
}

export const AssetsList = ({
  items,
  priceRange,
  renderer,
  rowHeight = ROW_HEIGHT,
  initialIndex,
  saveScrollPosition,
  onAssetsListScroll = () => {},
}) => {
  const slugs = items.map((item) => item.slug)
  const [savedLastIndex, setSavedLastIndex] = useState(30)
  const [savedStartIndex, setSavedStartIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(slugs.slice(0, savedLastIndex))
  const [graphData, loading] = usePriceGraph({
    slugs: visibleItems,
    range: priceRange,
  })
  const normalizedItems = normalizeGraphData(graphData, items, `priceChart${priceRange}`, loading)

  const rowRenderer =
    renderer ||
    function ({ key, index, style }) {
      const asset = normalizedItems[index]
      return (
        <div key={key} style={style}>
          <AssetCard {...asset} onAssetClick={saveScrollPosition} priceRange={priceRange} />
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
            onRowsRendered={({ overscanStartIndex, overscanStopIndex, startIndex }) => {
              if (savedLastIndex - startIndex < 5 || startIndex - savedStartIndex < 0) {
                const newLastIndex = overscanStopIndex + 25
                setSavedLastIndex(newLastIndex)
                setSavedStartIndex(overscanStartIndex)
                setVisibleItems(slugs.slice(overscanStartIndex, newLastIndex))
              }
            }}
          />
        )}
      </AutoSizer>
    </div>
  )
}

export default AssetsMobilePage
