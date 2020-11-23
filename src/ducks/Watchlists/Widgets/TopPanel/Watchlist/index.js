import React from 'react'
import cx from 'classnames'
import BaseActions from '../WatchlistBaseActions'
import Share from '../../../Actions/Share'
import WeeklyReportTrigger from '../../../Actions/WeeklyReport/Trigger'
import styles from '../index.module.scss'
import Widgets from '../Widgets'

const TopPanel = ({
  name,
  id,
  watchlist,
  isAuthor,
  className,
  isMonitored,
  assets,
  ...props
}) => {
  return (
    <section className={cx(styles.wrapper, className)}>
      <div className={styles.row}>
        <h1 className={styles.name}>{name}</h1>
        {isAuthor && id && (
          <BaseActions
            isAuthor={isAuthor}
            name={name}
            id={id}
            watchlist={watchlist}
            assets={assets}
          />
        )}
      </div>
      <div className={styles.row}>
        <Widgets {...props} />
        {watchlist && <Share watchlist={watchlist} isAuthor={isAuthor} />}
        {isAuthor && (
          <WeeklyReportTrigger id={id} name={name} isMonitored={isMonitored} />
        )}
      </div>
    </section>
  )
}

export default TopPanel
