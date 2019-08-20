import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Button from '@santiment-network/ui/Button'
import ProjectIcon from '../../../components/ProjectIcon'
import PercentChanges from '../../../components/PercentChanges'
import WatchlistsPopup from '../../../components/WatchlistPopup/WatchlistsPopup'
import { formatNumber } from '../../../utils/formatting'
import ChartSignalCreationDialog from '../../../ducks/SANCharts/ChartSignalCreationDialog'
import Loader from '@santiment-network/ui/Loader/Loader'
import addSignalSvg from './../../../assets/signals/buttons/addSignal.svg'
import addWatchlistSvg from './../../../assets/watchlist/buttons/watchlist.svg'
import styles from './DetailedHeader.module.scss'
import PageLoader from '../../../components/Loader/PageLoader'

const DetailedHeader = ({
  project = {
    ticker: '',
    name: '',
    description: '',
    slug: '',
    priceUsd: 0,
    percentChange7d: 0,
    percentChange24h: 0,
    totalSupply: 0
  },
  loading,
  isLoggedIn,
  isDesktop
}) => {
  const {
    id,
    name,
    description,
    slug,
    ticker,
    priceUsd,
    percentChange24h,
    totalSupply,
    percentChange7d
  } = project

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <PageLoader />
      </div>
    )
  }

  return (
    <>
      <div className={styles.breadcrambs}>
        <Link to='/projects' className={styles.breadcrambLink}>
          Assets
        </Link>{' '}
        <span className={styles.breadcrambLink}>{'>'}</span>{' '}
        <Link className={styles.breadcrambCurrent} to={`/projects/${slug}`}>
          {name}
        </Link>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <ProjectIcon name={name || ''} ticker={ticker} size={40} />
            <div className={styles.name}>
              <h1>{name}</h1>
              <div className={styles.description}>{description}</div>
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
        </div>
        {isLoggedIn && isDesktop && (
          <div className={styles.right}>
            <ChartSignalCreationDialog
              slug={slug}
              trigger={
                <Button border accent='ghost' className={styles.signalButton}>
                  <img
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
                  accent='positive'
                  variant='fill'
                  className={styles.watchlistButton}
                >
                  <img
                    className={cx(styles.icon, styles.watchlistIcon)}
                    src={addWatchlistSvg}
                    alt='Watch slug'
                  />
                  Watch {name}
                </Button>
              }
              projectId={id}
              slug={slug}
              isLoggedIn={isLoggedIn}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default DetailedHeader
