import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import WatchlistContextMenu from './WatchlistContextMenu'
import { upperCaseFirstLetter } from '../../../../utils/formatting'
import Copy from '../../Actions/Copy'
import Share from '../../Actions/Share'
import DownloadCSV from '../../Actions/DownloadCSV'
import WeeklyReportTrigger from '../../Actions/WeeklyReport/Trigger'
import styles from './WatchlistActionButton.module.scss'

const WatchlistActions = ({
  isAuthor,
  id,
  title: initialTitle,
  items,
  type,
  isDesktop,
  isMonitored,
  watchlist = {}
}) => {
  if (!watchlist) {
    return null
  }

  const { isPublic } = watchlist
  const title = upperCaseFirstLetter(initialTitle)

  return (
    <>
      {isDesktop && <Share watchlist={watchlist} isAuthor={isAuthor} />}
      <WatchlistContextMenu
        watchlist={watchlist}
        isAuthor={isAuthor}
        id={id}
        name={title}
        items={items}
        isDesktop={isDesktop}
        isMonitored={isMonitored}
      />
      {isAuthor && isDesktop && (
        <WeeklyReportTrigger id={id} name={title} isMonitored={isMonitored} />
      )}
    </>
  )
}

export default WatchlistActions
