import React, { useState } from 'react'
import cx from 'classnames'
import { AutoSizer, List } from 'react-virtualized'
import Label from '@santiment-network/ui/Label'
import GetAssets, { SORT_TYPES } from './GetAssets'
import { RANGES } from '../../components/WatchlistOverview/constants'
import { getTableTitle } from './utils'
import { addRecentWatchlists, removeRecentWatchlists } from '../../utils/recent'
import AssetCard from './AssetCard'
import AssetsTemplates from './AssetsTemplates'
import WatchlistActions from './WatchlistActions'
import WatchlistAnomalies from '../../components/WatchlistOverview/WatchlistAnomalies/WatchlistAnomalies'
import PageLoader from '../../components/Loader/PageLoader'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import styles from './AssetsMobilePage.module.scss'

const AssetsMobilePage = props => {
  const { isLoggedIn } = props
  const isList = props.type === 'list'

  const [pointer, setPointer] = useState(1)
  const [range, setRange] = useState(RANGES[pointer])
  const [filteredItems, setFilteredItems] = useState(null)
  const [filterType, setFilterType] = useState(null)
  const [currentItems, setCurrentItems] = useState(null)

  const changeRange = () => {
    const newPointer = pointer === RANGES.length - 1 ? 0 : pointer + 1
    setPointer(newPointer)
    setRange(RANGES[newPointer])
  }

  const toggleAssetsFiltering = (assets, type, items) => {
    if (type === filterType) {
      setFilterType(null)
      setFilteredItems(null)
    } else {
      setFilterType(type)
      setFilteredItems(assets)
    }
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
          items,
          trendingAssets = []
        }) => {
          if (items !== currentItems) {
            setCurrentItems(items)
            setFilteredItems(null)
            setFilterType(null)
          }

          const title = getTableTitle(props)

          if (items.length && (isCurrentUserTheAuthor || isPublicWatchlist)) {
            addRecentWatchlists(listId)
          } else {
            // NOTE(vanguard): it's needed because when visiting empty/private watchlist all props stays the same for some time
            // but listId is changed immediatly which leads to adding listId to recents
            removeRecentWatchlists(listId)
          }

          return isLoading ? (
            <>
              <MobileHeader title={title} backRoute='/assets' />
              <PageLoader />
            </>
          ) : (
            <>
              <MobileHeader
                title={title}
                backRoute='/assets'
                rightActions={
                  isLoggedIn ? (
                    <WatchlistActions
                      isLoggedIn={isLoggedIn}
                      isDesktop={false}
                      isList={isList}
                      listType={props.location.hash}
                      shareLink={window.location.href + '#shared'}
                      isAuthor={isCurrentUserTheAuthor}
                      id={listId}
                      title={title}
                      items={items}
                      type={props.type}
                      location={props.location}
                    />
                  ) : null
                }
              />
              {items.length > 0 && (
                <>
                  <WatchlistAnomalies
                    trends={trendingAssets}
                    isDesktop={false}
                    range={range}
                    type={filterType}
                    changeRange={changeRange}
                    onFilterAssets={(assets, type) =>
                      toggleAssetsFiltering(assets, type, items)
                    }
                  />
                  <div className={styles.headings}>
                    <Label accent='casper'>Coin</Label>
                    <Label accent='casper'>Price, 24h</Label>
                  </div>
                  <AssetsList items={filteredItems || items} />
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

const ROW_HEIGHT = 71

export const AssetsList = ({ items, renderer, rowHeight = ROW_HEIGHT }) => {
  const rowRenderer =
    renderer ||
    function ({ key, index, style }) {
      const asset = items[index]
      return (
        <div key={key} style={style}>
          <AssetCard {...asset} />
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
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </div>
  )
}

export default AssetsMobilePage
