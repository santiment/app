import React from 'react'
import Infographics from './Infographics'
import { PROJECT } from '../../ducks/Watchlists/detector'
import TopPanel from '../../ducks/Watchlists/Widgets/TopPanel'
import { useScreenerUrl } from '../../ducks/Watchlists/utils'
import { useRecent } from '../../ducks/Watchlists/gql/list/hooks'
import AssetsTemplates from '../../ducks/Watchlists/Widgets/Table/AssetsTemplates'
import styles from './Watchlist.module.scss'

const WatchlistPage = ({ location, history, watchlist }) => {
  useRecent(watchlist, PROJECT)
  const { widgets, setWidgets } = useScreenerUrl({
    location,
    history,
    defaultParams: { isMovement: true }
  })

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
