import React, { useState } from 'react'
import cx from 'classnames'
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

const COLORS = ['#89E1C9', '#DCF6EF', '#EDF8F5']
const SOCIAL_VOLUME_PROJECTS_COLORS = ['#C9C2FF', '#E7E4FF', '#F3F1FF']

const Screener = props => {
  const [isPriceChartActive, setPriceChart] = useState(false)
  const [isPriceTreeMap, setPriceTreeMap] = useState(false)
  const [isVolumeTreeMap, setVolumeTreeMap] = useState(false)

  const bothCharts = isPriceTreeMap && isVolumeTreeMap

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
                name={props.watchlist.name || props.name}
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

              {!isLoading && items.length > 0 && (
                <>
                  {(isVolumeTreeMap || isPriceTreeMap) && (
                    <>
                      <div className={styles.treeMaps}>
                        {isPriceTreeMap && (
                          <ProjectsTreeMap
                            className={cx(
                              styles.containerTreeMap,
                              bothCharts && styles.both
                            )}
                            assets={items}
                            title='Top 10: Price Up'
                            colors={COLORS}
                            ranges={RANGES}
                          />
                        )}
                        {isVolumeTreeMap && (
                          <ProjectsTreeMap
                            className={cx(
                              styles.containerTreeMap,
                              bothCharts && styles.both
                            )}
                            assets={items}
                            title='Top 10: Social volume'
                            ranges={[
                              {
                                label: '24h',
                                key: 'volumeChange24h'
                              }
                            ]}
                            colors={SOCIAL_VOLUME_PROJECTS_COLORS}
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
