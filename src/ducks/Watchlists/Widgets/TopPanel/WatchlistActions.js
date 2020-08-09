import React from 'react'
import WatchlistContextMenu from './WatchlistContextMenu'
import { upperCaseFirstLetter } from '../../../../utils/formatting'
import Share from '../../Actions/Share'
import WeeklyReportTrigger from '../../Actions/WeeklyReport/Trigger'

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
