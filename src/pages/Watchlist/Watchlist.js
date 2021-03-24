import React, { useMemo } from 'react'
import Infographics from './Infographics'
import { PROJECT } from '../../ducks/Watchlists/detector'
import { useScreenerUrl } from '../../ducks/Watchlists/utils'
import TopPanel from '../../ducks/Watchlists/Widgets/TopPanel'
import { useRecent } from '../../ducks/Watchlists/gql/list/hooks'
import { getProjectsByFunction } from '../../ducks/Watchlists/gql/hooks'
import { useColumns } from '../../ducks/Watchlists/Widgets/Table/hooks'
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
      activeColumns,
      pagination,
      orderBy,
      fn
    })
  )

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
      <AssetsTemplates items={watchlist.listItems} watchlist={watchlist} />
    </>
  )
}

export default WatchlistPage
