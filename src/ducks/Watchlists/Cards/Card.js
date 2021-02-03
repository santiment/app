import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { getSEOLinkFromIdAndTitle } from '../../../utils/url'
import NewLabel from '../../../components/NewLabel/NewLabel'
import { VisibilityIndicator } from '../../../components/VisibilityIndicator'
import styles from './Card.module.scss'

const WatchlistCard = ({
  className,
  classes,
  watchlist,
  path,
  simplifiedChildren,
  middleChildren,
  bottomChildren,
  isSimplified,
  isWithNewCheck,
  isWithVisibility
}) => {
  const { id, name, insertedAt, isPublic, href } = watchlist
  const to = href || path + getSEOLinkFromIdAndTitle(id, name)

  if (isSimplified) {
    return (
      <Link to={to} className={cx(styles.wrapper, styles.simple, className)}>
        {name}
        {simplifiedChildren}
      </Link>
    )
  }

  return (
    <Link to={to} className={cx(styles.wrapper, className)}>
      <div className={styles.header}>
        {isWithNewCheck && (
          <NewLabel date={insertedAt} className={styles.new} />
        )}
        {name}
        {isWithVisibility && (
          <VisibilityIndicator
            isPublic={isPublic}
            className={styles.visibility}
          />
        )}
      </div>

      <div className={cx(styles.middle, classes.middle)}>{middleChildren}</div>
      <div className={styles.bottom}>{bottomChildren}</div>
    </Link>
  )
}

WatchlistCard.defaultProps = {
  classes: {},
  isWithNewCheck: true,
  isWithVisibility: true
}

export const WatchlistCards = ({ watchlists, Card, ...props }) =>
  watchlists.map(watchlist => (
    <Card {...props} key={watchlist.id} watchlist={watchlist} />
  ))

export default WatchlistCard
