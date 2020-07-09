import React, { useState } from 'react'
import cx from 'classnames'
import PageLoader from '../../components/Loader/PageLoader'
import TopPanel from './TopPanel'
import GetAssets from '../assets/GetAssets'
import { getWatchlistName } from '../assets/utils'
import AssetsTable from '../assets/AssetsTable'
import { ASSETS_TABLE_COLUMNS } from '../assets/asset-columns'
import ProjectsChart, {
  RANGES
} from '../../components/VolumeChart/ProjectsChart'
import styles from './index.module.scss'
import ProjectsTreeMap from '../../components/VolumeChart/ProjectsTreeMap'

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
            items = []
          } = Assets

          return (
            <>
              <TopPanel
                name={title || props.name}
                id={listId}
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
