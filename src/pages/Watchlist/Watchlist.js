import React, { useEffect, useMemo, useState } from 'react'
import Infographics from './Infographics'
import { PROJECT } from '../../ducks/Watchlists/detector'
import { useScreenerUrl } from '../../ducks/Watchlists/utils'
import TopPanel from '../../ducks/Watchlists/Widgets/TopPanel'
import AssetsTable from '../../ducks/Watchlists/Widgets/Table'
import { useRecent } from '../../ducks/Watchlists/gql/list/hooks'
import { useColumns } from '../../ducks/Watchlists/Widgets/Table/hooks'
import {
  getAssetsByFunction,
  getProjectsByFunction
} from '../../ducks/Watchlists/gql/hooks'
import { buildFunctionQuery } from '../../ducks/Watchlists/Widgets/Filter/utils'
import AssetsTemplates from '../../ducks/Watchlists/Widgets/Table/AssetsTemplates'
import styles from './Watchlist.module.scss'

const WatchlistPage = ({ location, history, watchlist }) => {
  const fn = useMemo(
    () => ({
      name: 'selector',
      args: { filters: [], baseProjects: [{ watchlistId: watchlist.id }] }
    }),
    [watchlist.id]
  )
  useRecent(watchlist, PROJECT)
  const [tableLoading, setTableLoading] = useState(true)
  const { widgets, setWidgets } = useScreenerUrl({
    location,
    history,
    defaultParams: { isMovement: true }
  })

  const {
    pagination,
    setPagination,
    orderBy,
    setOrderBy,
    fetchData,
    activeColumns,
    setActiveColumnsKeys
  } = useColumns()

  const { assets, projectsCount, loading } = getProjectsByFunction(
    ...buildFunctionQuery({
      fn,
      orderBy,
      pagination,
      activeColumns
    })
  )

  useEffect(
    () => {
      if (loading !== tableLoading) {
        setTableLoading(loading)
      }
    },
    [loading]
  )

  useEffect(
    () => {
      if (!tableLoading) {
        refetchAssets()
      }
    },
    [orderBy]
  )

  const refetchAssets = () => {
    setTableLoading(true)
    getAssetsByFunction(
      ...buildFunctionQuery({
        fn,
        orderBy,
        pagination,
        activeColumns
      })
    ).then(() => setTableLoading(false))
  }

  return (
    <>
      <TopPanel
        type={PROJECT}
        widgets={widgets}
        setWidgets={setWidgets}
        className={styles.top}
        watchlist={watchlist}
      />
      <Infographics
        type='Watchlist'
        listId={watchlist.id}
        widgets={widgets}
        setWidgets={setWidgets}
      />

      <AssetsTable
        items={assets}
        type={PROJECT}
        loading={loading}
        sorting={orderBy}
        watchlist={watchlist}
        fetchData={fetchData}
        setOrderBy={setOrderBy}
        refetchAssets={refetchAssets}
        projectsCount={projectsCount}
        activeColumns={activeColumns}
        pageSize={pagination.pageSize}
        pageIndex={pagination.page - 1}
        updateActiveColumnsKeys={setActiveColumnsKeys}
        onChangePage={pageIndex =>
          setPagination({ ...pagination, page: +pageIndex + 1 })
        }
      />
      <AssetsTemplates items={watchlist.listItems} watchlist={watchlist} />
    </>
  )
}

export default WatchlistPage
