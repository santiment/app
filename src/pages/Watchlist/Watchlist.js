import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import qs from 'query-string'
import { getOrigin } from '../../utils/utils'
import { useComparingAssets } from '../../ducks/Watchlists/Widgets/Table/CompareDialog/hooks'
import PageLoader from '../../components/Loader/PageLoader'
import { upperCaseFirstLetter } from '../../utils/formatting'
import GetAssets from '../../ducks/Watchlists/Widgets/Table/GetAssets'
import TopPanel from '../../ducks/Watchlists/Widgets/TopPanel/Watchlist'
import AssetsTable from '../../ducks/Watchlists/Widgets/Table/AssetsTable'
import {
  getHelmetTags,
  getWatchlistName,
  useScreenerUrl
} from '../../ducks/Watchlists/utils'
import AssetsTemplates from '../../ducks/Watchlists/Widgets/Table/AssetsTemplates'
import { ASSETS_TABLE_COLUMNS } from '../../ducks/Watchlists/Widgets/Table/columns'
import { useAssetsAnomalyToggler } from './hooks/useAssetsAnomalyToggler'
import { addRecentWatchlists } from '../../utils/recent'
import Infographics from './Infographics'
import styles from './Watchlist.module.scss'

const WatchlistPage = props => {
  const [currentItems, setCurrentItems] = useState([])
  const { type, location, history } = props
  const { id, name } = qs.parse(location.search)

  const isList = type === 'list'
  const { title, description } = getHelmetTags(isList, name)

  const {
    toggleAssetsFiltering,
    filteredItems,
    clearFilters,
    filterType
  } = useAssetsAnomalyToggler()

  const { comparingAssets, addAsset, cleanAll } = useComparingAssets()
  const { widgets, setWidgets } = useScreenerUrl({
    location,
    history,
    defaultParams: {
      isMovement: true
    }
  })

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
            clearFilters()
          }

          if (listId) {
            addRecentWatchlists(listId)
          }

          const showingAssets = filteredItems || items

          const changingName = (props.watchlist || {}).name || props.name

          return (
            <>
              <TopPanel
                name={changingName && upperCaseFirstLetter(changingName)}
                description={(props.watchlist || {}).description}
                id={listId}
                assets={items}
                watchlist={props.watchlist}
                isMonitored={isMonitored}
                isAuthor={isCurrentUserTheAuthor}
                isAuthorLoading={isLoading}
                className={styles.top}
                widgets={widgets}
                setWidgets={setWidgets}
              />
              {isLoading && <PageLoader />}

              {!isLoading && items.length > 0 && (
                <>
                  <Infographics
                    type='Watchlist'
                    assets={showingAssets}
                    listId={id}
                    widgets={widgets}
                    setWidgets={setWidgets}
                    trendingAssets={trendingAssets}
                    toggleAssetsFiltering={toggleAssetsFiltering}
                    filterType={filterType}
                  />

                  <AssetsTable
                    Assets={Assets}
                    watchlist={props.watchlist}
                    filterType={filterType}
                    items={showingAssets}
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
