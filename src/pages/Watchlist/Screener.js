import React, { useState } from 'react'
import PageLoader from '../../components/Loader/PageLoader'
import { getWatchlistName } from '../../ducks/Watchlists/utils'
import TopPanel from '../../ducks/Watchlists/Widgets/TopPanel'
import GetAssets from '../../ducks/Watchlists/Widgets/Table/GetAssets'
import AssetsTable from '../../ducks/Watchlists/Widgets/Table/AssetsTable'
import { ASSETS_TABLE_COLUMNS } from '../../ducks/Watchlists/Widgets/Table/asset-columns'
import ProjectsTreeMap from '../../ducks/Watchlists/Widgets/VolumeChart/ProjectsTreeMap'
import ProjectsChart, {
  RANGES
} from '../../ducks/Watchlists/Widgets/VolumeChart/ProjectsChart'
import styles from './Screener.module.scss'

const Screener = props => {
  const [isPriceChartActive, setPriceChart] = useState(false)
  const [isPriceTreeMap, setPriceTreeMap] = useState(false)
  const [isVolumeTreeMap, setVolumeTreeMap] = useState(false)

  return (
    <div className={('page', styles.container)}>
      <GetAssets
        {...props}
        type={props.type}
        render={Assets => {
          const title = getWatchlistName(props)
          const {
            typeInfo: { listId },
            isLoading,
            isCurrentUserTheAuthor,
            items = [],
            projectsCount
          } = Assets

          return (
            <>
              <TopPanel
                name={(props.watchlist || {}).name || props.name}
                id={listId}
                watchlist={props.watchlist}
                shareLink={window.location.href + '#shared'}
                isAuthor={isCurrentUserTheAuthor}
                isLoggedIn={props.isLoggedIn}
                widgets={{
                  isPriceChart: isPriceChartActive,
                  isPriceTreeMap: isPriceTreeMap,
                  isVolumeTreeMap: isVolumeTreeMap
                }}
                togglers={{
                  priceToggle: setPriceChart,
                  togglePriceTreeMap: setPriceTreeMap,
                  toggleVolumeTreeMap: setVolumeTreeMap
                }}
              />
              {isLoading && <PageLoader className={styles.loading} />}

              {!isLoading && (
                <>
                  {(isVolumeTreeMap || isPriceTreeMap) && (
                    <>
                      <div className={styles.treeMaps}>
                        {isPriceTreeMap && (
                          <ProjectsTreeMap
                            className={styles.containerTreeMap}
                            assets={items}
                            title='Price Up'
                            ranges={RANGES}
                          />
                        )}
                        {isVolumeTreeMap && (
                          <ProjectsTreeMap
                            className={styles.containerTreeMap}
                            assets={items}
                            title='Social volume'
                            ranges={[
                              {
                                label: '24h',
                                key: 'volumeChange24h'
                              }
                            ]}
                          />
                        )}
                      </div>
                    </>
                  )}
                  {isPriceChartActive && <ProjectsChart assets={items} />}
                  <AssetsTable
                    Assets={Assets}
                    items={items}
                    type='screener'
                    isAuthor={isCurrentUserTheAuthor}
                    projectsCount={projectsCount}
                    watchlist={props.watchlist}
                    classes={{ container: styles.tableWrapper }}
                    className={styles.table}
                    goto={props.history.push}
                    preload={props.preload}
                    listName={title}
                    allColumns={ASSETS_TABLE_COLUMNS}
                  />
                </>
              )}
            </>
          )
        }}
      />
    </div>
  )
}

export default Screener
