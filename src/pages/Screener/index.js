import React, { useState } from 'react'
import cx from 'classnames'
import PageLoader from '../../components/Loader/PageLoader'
import TopPanel from './TopPanel'
import GetAssets from '../assets/GetAssets'
import { getWatchlistName } from '../assets/utils'
import AssetsTable from '../assets/AssetsTable'
import { ASSETS_TABLE_COLUMNS } from '../assets/asset-columns'
import ProjectsChart from '../Marketing/VolumeChart/ProjectsChart'
import styles from './index.module.scss'

const Screener = props => {
  const [isPriceChartActive, setPriceChart] = useState(false)

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
            isPublicWatchlist,
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
                  priceActive: isPriceChartActive
                }}
                togglers={{
                  priceToggle: setPriceChart
                }}
              />
              {isLoading && <PageLoader className={styles.loading} />}

              {!isLoading && items.length > 0 && (
                <>
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
