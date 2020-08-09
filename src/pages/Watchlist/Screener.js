import React, { useState } from 'react'
import {
  getWatchlistName,
  DEFAULT_SCREENER_FUNCTION
} from '../../ducks/Watchlists/utils'
import { getProjectsByFunction } from '../../ducks/Watchlists/gql/hooks'
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
  const [screenerFunction, setScreenerFunction] = useState(
    props.watchlist.function || DEFAULT_SCREENER_FUNCTION
  )
  const [assets = [], loading] = getProjectsByFunction(screenerFunction)

  return (
    <div className={('page', styles.screener)}>
      <GetAssets
        {...props}
        type={props.type}
        render={Assets => {
          const title = getWatchlistName(props)
          const {
            typeInfo: { listId },
            isCurrentUserTheAuthor,
            projectsCount
          } = Assets

          return (
            <>
              <TopPanel
                name={(props.watchlist || {}).name || props.name}
                id={listId}
                watchlist={props.watchlist}
                isAuthor={isCurrentUserTheAuthor}
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
              {isPriceTreeMap && (
                <div className={styles.treeMaps}>
                  <ProjectsTreeMap
                    className={styles.containerTreeMap}
                    assets={assets}
                    title='Price changes'
                    ranges={RANGES}
                    loading={loading}
                  />
                </div>
              )}
              {isPriceChartActive && (
                <ProjectsChart loading={loading} assets={assets} />
              )}
              <AssetsTable
                Assets={{ ...Assets, isLoading: loading }}
                items={assets}
                type='screener'
                isDefaultScreener={props.isDefaultScreener}
                isLoggedIn={props.isLoggedIn}
                screenerFunction={screenerFunction}
                setScreenerFunction={setScreenerFunction}
                isAuthor={isCurrentUserTheAuthor}
                projectsCount={projectsCount}
                watchlist={props.watchlist}
                classes={{ container: styles.tableWrapper }}
                className={styles.table}
                goto={props.history.push}
                history={props.history}
                preload={props.preload}
                listName={title}
                allColumns={ASSETS_TABLE_COLUMNS}
              />
            </>
          )
        }}
      />
    </div>
  )
}

export default Screener
