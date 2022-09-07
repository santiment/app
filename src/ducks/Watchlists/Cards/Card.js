import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import NewLabel from '../../../components/NewLabel/NewLabel'
import { VisibilityIndicator } from '../../../components/VisibilityIndicator'
import { DesktopOnly, MobileOnly } from '../../../components/Responsive'
import { getSEOLinkFromIdAndTitle } from '../../../utils/url'
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
  isWithVisibility,
  chart,
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
    <>
      <DesktopOnly>
        <Link to={to} className={cx(styles.wrapper, 'btn c-black', className)}>
          <div className={cx(styles.header, 'row v-center body-2')}>
            {isWithNewCheck && <NewLabel date={insertedAt} className={styles.new} />}
            {name}
            {isWithVisibility && (
              <VisibilityIndicator isPublic={isPublic} className={styles.visibility} />
            )}
          </div>

          <div className={cx(styles.middle, 'h4 row justify', classes.middle)}>
            {middleChildren}
          </div>
          <div className={cx(styles.bottom, 'row v-center c-casper')}>{bottomChildren}</div>
        </Link>
      </DesktopOnly>
      <MobileOnly>
        <Link to={to} className={cx(styles.wrapper, 'btn row v-center justify c-black', className)}>
          <div className={cx(styles.info, 'column justify')}>
            <div className={cx(styles.header, 'row v-center body-2')}>
              {isWithNewCheck && <NewLabel date={insertedAt} className={styles.new} />}
              {name}
            </div>

            <div className={cx(styles.middle, 'h4 row justify', classes.middle)}>
              {middleChildren}
            </div>

            <div className={cx(styles.bottom, 'row v-center c-casper')}>{bottomChildren}</div>
          </div>
          {chart}
        </Link>
      </MobileOnly>
    </>
  )
}

WatchlistCard.defaultProps = {
  classes: {},
  isWithNewCheck: true,
  isWithVisibility: true,
}

export const WatchlistCards = ({ watchlists, Card, ...props }) =>
  watchlists.map((watchlist) => <Card {...props} key={watchlist.id} watchlist={watchlist} />)

export default WatchlistCard
