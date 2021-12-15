import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import Title from './Title'
import Filter from '../Filter'
import Widgets from './Widgets'
import BaseActions from './BaseActions'
import Share from '../../Actions/Share'
import { useIsAuthor } from '../../gql/list/hooks'
import { PROJECT, SCREENER } from '../../detector'
import WeeklyReport from '../../Actions/WeeklyReport'
import ScreenerSignalDialog from '../../../Signals/ScreenerSignal/ScreenerSignalDialog'
import Grave from '../../../../components/Halloween/Grave'
import styles from './index.module.scss'

const TopPanel = ({
  name,
  type,
  widgets,
  setWidgets,
  className,
  watchlist,
  isLoggedIn,
  projectsCount,
  isDefaultScreener,
  isUpdatingWatchlist,
  updateWatchlistFunction,
  refetchAssets,
  ...props
}) => {
  const { isAuthor, isAuthorLoading } = useIsAuthor(watchlist)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [knockNumber, setKnockNumber] = useState(0)

  useEffect(() => {
    if (knockNumber > 0) {
      setKnockNumber(0)
    }
  }, [])

  function closeFilter () {
    if (isFilterOpen) {
      setIsFilterOpen(false)
    }
  }

  return (
    <section
      className={cx(
        styles.wrapper,
        isFilterOpen && styles.open,
        type !== SCREENER && styles.light,
        className
      )}
    >
      <div className={styles.row}>
        <Title
          name={name}
          watchlist={watchlist}
          isDefaultScreener={isDefaultScreener}
        />
        <BaseActions
          type={type}
          watchlist={watchlist}
          onClick={closeFilter}
          isAuthor={isAuthor}
          isAuthorLoading={isAuthorLoading}
          refetchAssets={refetchAssets}
        />
        {isUpdatingWatchlist && (
          <span className={styles.saving}>Saving...</span>
        )}
        <Grave
          knockNumber={knockNumber}
          setKnockNumber={setKnockNumber}
          slug='screener'
          name='SAN'
        />
      </div>
      {type === SCREENER ? (
        <div className={styles.row}>
          <div onClick={closeFilter} className={styles.row}>
            {isAuthor && !isDefaultScreener && (
              <>
                <Share watchlist={watchlist} isAuthor={isAuthor} />
                <div className={styles.divider} />
              </>
            )}
            {(isAuthor || isDefaultScreener) && (
              <>
                <ScreenerSignalDialog watchlistId={watchlist.id} />
                <div className={styles.divider} />
              </>
            )}
            <Widgets widgets={widgets} setWidgets={setWidgets} />
          </div>
          <Filter
            watchlist={watchlist}
            projectsCount={projectsCount}
            isAuthor={isAuthor}
            isAuthorLoading={isAuthorLoading}
            isLoggedIn={isLoggedIn}
            isDefaultScreener={isDefaultScreener}
            setIsOpen={setIsFilterOpen}
            isOpen={isFilterOpen}
            updateWatchlistFunction={updateWatchlistFunction}
            {...props}
          />
        </div>
      ) : (
        <div className={styles.row}>
          {widgets && <Widgets widgets={widgets} setWidgets={setWidgets} />}
          {watchlist && <Share watchlist={watchlist} isAuthor={isAuthor} />}
          {isAuthor && type === PROJECT && (
            <WeeklyReport watchlist={watchlist} />
          )}
        </div>
      )}
    </section>
  )
}

export default TopPanel
