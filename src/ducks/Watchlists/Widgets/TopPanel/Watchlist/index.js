import React from 'react'
import cx from 'classnames'
import BaseActions from '../WatchlistBaseActions'
import Share from '../../../Actions/Share'
import Widgets from '../Widgets'
import WeeklyReport from '../../../Actions/WeeklyReport'
import HelpPopup from '../../../../../components/HelpPopup/HelpPopup'
import styles from '../index.module.scss'

const TopPanel = ({
  name,
  description,
  id,
  watchlist,
  isAuthor,
  isAuthorLoading,
  className,
  isMonitored,
  assets,
  ...props
}) => {
  return (
    <section className={cx(styles.wrapper, className)}>
      <div className={styles.row}>
        <h1 className={styles.name}>{name}</h1>
        {description && (
          <HelpPopup triggerClassName={styles.description}>
            {description}
          </HelpPopup>
        )}
        {id && (
          <BaseActions
            isAuthor={isAuthor}
            isAuthorLoading={isAuthorLoading}
            watchlist={watchlist}
            assets={assets}
          />
        )}
      </div>
      <div className={styles.row}>
        <Widgets {...props} />
        {watchlist && <Share watchlist={watchlist} isAuthor={isAuthor} />}
        {isAuthor && (
          <WeeklyReport id={id} name={name} isMonitored={isMonitored} />
        )}
      </div>
    </section>
  )
}

export default TopPanel
