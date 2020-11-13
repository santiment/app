import React, { useCallback, useState } from 'react'
import {
  getWatchlistName,
  DEFAULT_SCREENER_FUNCTION,
  useScreenerUrl
} from '../../ducks/Watchlists/utils'
import { getProjectsByFunction } from '../../ducks/Watchlists/gql/hooks'
import TopPanel from '../../ducks/Watchlists/Widgets/TopPanel'
import GetAssets from '../../ducks/Watchlists/Widgets/Table/GetAssets'
import AssetsTable from '../../ducks/Watchlists/Widgets/Table/AssetsTable'
import { ASSETS_TABLE_COLUMNS } from '../../ducks/Watchlists/Widgets/Table/columns'
import { addOrRemove } from '../../ducks/Watchlists/Widgets/Table/CompareDialog/CompareDialog'
import ScreenerWidgets from './Widgets/ScreenerWidgets'
import styles from './Screener.module.scss'

export const useComparingAssets = () => {
  const [comparingAssets, setComparingAssets] = useState([])
  const addAsset = useCallback(
    item => {
      setComparingAssets(
        addOrRemove(comparingAssets, item, ({ id }) => id === item.id)
      )
    },
    [comparingAssets, setComparingAssets]
  )

  const cleanAll = useCallback(
    () => {
      setComparingAssets([])
    },
    [setComparingAssets]
  )

  return {
    comparingAssets,
    addAsset,
    cleanAll
  }
}

const Screener = props => {
  const [screenerFunction, setScreenerFunction] = useState(
    props.watchlist.function || DEFAULT_SCREENER_FUNCTION
  )
  const [assets = [], loading] = getProjectsByFunction(screenerFunction)

  const {
    watchlist,
    name,
    isLoggedIn,
    isDefaultScreener,
    location,
    history,
    preload,
    type
  } = props

  const { widgets, setWidgets } = useScreenerUrl({ location, history })

  const { comparingAssets, addAsset, cleanAll } = useComparingAssets()

  return (
    <div className={('page', styles.screener)}>
      <GetAssets
        {...props}
        type={type}
        render={Assets => {
          const title = getWatchlistName(props)
          const {
            typeInfo: { listId },
            isCurrentUserTheAuthor
          } = Assets

          return (
            <>
              <TopPanel
                name={(watchlist || {}).name || name}
                id={listId}
                assets={assets}
                loading={loading}
                watchlist={watchlist}
                isAuthor={isCurrentUserTheAuthor}
                isLoggedIn={isLoggedIn}
                screenerFunction={screenerFunction}
                setScreenerFunction={setScreenerFunction}
                isDefaultScreener={isDefaultScreener}
                history={history}
                widgets={widgets}
                setWidgets={setWidgets}
              />

              <ScreenerWidgets
                assets={assets}
                loading={loading}
                widgets={widgets}
                setWidgets={setWidgets}
              />

              <AssetsTable
                Assets={{ ...Assets, isLoading: loading }}
                items={assets}
                type='screener'
                isAuthor={isCurrentUserTheAuthor}
                watchlist={watchlist}
                className={styles.table}
                goto={history.push}
                history={history}
                preload={preload}
                listName={title}
                allColumns={ASSETS_TABLE_COLUMNS}
                compareSettings={{
                  comparingAssets,
                  addAsset,
                  cleanAll
                }}
              />
            </>
          )
        }}
      />
    </div>
  )
}

export default Screener
