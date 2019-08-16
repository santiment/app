import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import {
  createSkeletonElement,
  createSkeletonProvider
} from '@trainline/react-skeletor'
import { compose } from 'recompose'
import Label from '@santiment-network/ui/Label'
import Button from '@santiment-network/ui/Button'
import ProjectIcon from '../../../components/ProjectIcon'
import PercentChanges from '../../../components/PercentChanges'
import WatchlistsPopup from '../../../components/WatchlistPopup/WatchlistsPopup'
import { formatNumber } from '../../../utils/formatting'
import ChartSignalCreationDialog from '../../../ducks/SANCharts/ChartSignalCreationDialog'
import addSignalSvg from './../../../assets/signals/buttons/addSignal.svg'
import addWatchlistSvg from './../../../assets/watchlist/buttons/watchlist.svg'
import styles from './DetailedHeader.module.scss'

const DIV = createSkeletonElement('div', 'pending-header pending-div')

const DetailedHeader = ({
  project = {
    ticker: '',
    name: '',
    description: '',
    slug: ''
  },
  loading,
  isLoggedIn,
  isDesktop
}) => (
  <>
    <div className={styles.breadcrambs}>
      <Link to='/projects' className={styles.breadcrambLink}>
        Assets
      </Link>{' '}
      <span className={styles.breadcrambLink}>{'>'}</span>{' '}
      <Link
        className={styles.breadcrambCurrent}
        to={`/projects/${project.slug}`}
      >
        {project.name}
      </Link>
    </div>
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <DIV className={styles.logo}>
          <ProjectIcon
            name={project.name || ''}
            ticker={project.ticker}
            size={40}
          />
          <div className={styles.name}>
            <h1>{project.name}</h1>
            <DIV className={styles.description}>{project.description}</DIV>
          </div>
        </DIV>

        <div className={styles.price}>
          <div className={styles.priceUsd}>
            {project.priceUsd &&
              formatNumber(project.priceUsd, { currency: 'USD' })}
            <PercentChanges
              className={styles.percentChanges}
              changes={project.percentChange24h}
            />
            <Label className={styles.label} accent='waterloo'>
              24h
            </Label>
          </div>
          {!loading && project && (
            <div className={styles.percentsBottom}>
              <Label className={styles.supply}>
                {project.totalSupply} {project.ticker}
              </Label>
              <PercentChanges
                className={styles.percentChangesSmall}
                changes={project.percentChange7d}
              />
              <Label className={styles.label} accent='waterloo'>
                7d
              </Label>
            </div>
          )}
        </div>
      </div>
      {isLoggedIn && isDesktop && !loading && (
        <div className={styles.right}>
          <ChartSignalCreationDialog
            slug={project.slug}
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
                Watch {project.name}
              </Button>
            }
            projectId={project.id}
            slug={project.slug}
            isLoggedIn={isLoggedIn}
          />
        </div>
      )}
    </div>
  </>
)

export default compose(
  createSkeletonProvider(
    {
      project: {
        name: '',
        description: '______ ___ ______ __ _____ __ ______',
        ticker: '',
        percentChange24h: 0,
        percentChange7d: 0,
        priceBtc: 0,
        priceUsd: 0
      }
    },
    ({ loading }) => loading,
    () => ({
      backgroundColor: '#bdc3c7',
      color: '#bdc3c7'
    })
  )
)(DetailedHeader)
