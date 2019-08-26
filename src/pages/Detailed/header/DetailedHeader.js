import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Button from '@santiment-network/ui/Button'
import PercentChanges from '../../../components/PercentChanges'
import WatchlistsPopup from '../../../components/WatchlistPopup/WatchlistsPopup'
import { formatNumber } from '../../../utils/formatting'
import ChartSignalCreationDialog from '../../../ducks/SANCharts/ChartSignalCreationDialog'
import PageLoader from '../../../components/Loader/PageLoader'
import HeaderProjectsSelector from './HeaderProjectsSelector'
import addSignalSvg from './../../../assets/signals/buttons/addSignal.svg'
import addWatchlistSvg from './../../../assets/watchlist/buttons/watchlist.svg'
import styles from './DetailedHeader.module.scss'

const DetailedHeader = ({
  project = {
    ticker: '',
    name: '',
    slug: '',
    priceUsd: 0,
    percentChange7d: 0,
    percentChange24h: 0,
    totalSupply: 0
  },
  loading,
  isLoggedIn,
  onChangeProject
}) => {
  const {
    id,
    name = '',
    slug,
    ticker,
    priceUsd,
    percentChange24h,
    totalSupply,
    percentChange7d
  } = project

  if (loading) {
    return (
      <PageLoader
        isPage={false}
        containerClass={styles.headerLoaderContainer}
        className={styles.headerLoader}
      />
    )
  }

  return (
    <>
      <div className={styles.breadcrambs}>
        <Link to='/assets' className={styles.breadcrambLink}>
          Assets
        </Link>{' '}
        <span className={styles.breadcrambLink}>{'>'}</span>{' '}
        <Link className={styles.breadcrambCurrent} to={`/projects/${slug}`}>
          {name}
        </Link>
      </div>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <HeaderProjectsSelector
              project={project}
              onChange={onChangeProject}
            />
          </div>
        </div>
        <div className={styles.price}>
          <div className={styles.priceUsd}>
            <Label className={styles.priceUsdLabel}>
              {priceUsd && formatNumber(priceUsd, { currency: 'USD' })}
            </Label>
            <PercentChanges
              className={styles.percentChanges}
              changes={percentChange24h}
            />
            <Label className={styles.label} accent='waterloo'>
              24h
            </Label>
          </div>
          {project && (
            <div className={styles.percentsBottom}>
              <Label className={styles.supply}>
                {formatNumber(totalSupply)} {ticker}
              </Label>
              <PercentChanges
                className={styles.percentChangesSmall}
                changes={percentChange7d}
              />
              <Label className={styles.label} accent='waterloo'>
                7d
              </Label>
            </div>
          )}
        </div>
        <div className={styles.right}>
          <ChartSignalCreationDialog
            slug={slug}
            trigger={
              <Button border className={styles.signalButton}>
                <img
                  disabled={!isLoggedIn}
                  className={styles.icon}
                  src={addSignalSvg}
                  alt='Add signal'
                />
                Add signal
              </Button>
            }
          />

          <WatchlistsPopup
            trigger={
              <Button
                disabled={!isLoggedIn}
                accent='positive'
                variant='fill'
                className={styles.watchlistButton}
              >
                <img
                  className={cx(styles.icon, styles.watchlistIcon)}
                  src={addWatchlistSvg}
                  alt='Watch slug'
                />
                Watch {ticker}
              </Button>
            }
            projectId={id}
            slug={slug}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </div>
    </>
  )
}

export default DetailedHeader
