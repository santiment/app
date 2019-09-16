import React, { useState } from 'react'
import {
  createSkeletonElement,
  createSkeletonProvider
} from '@trainline/react-skeletor'
import { graphql } from 'react-apollo'
import withSizes from 'react-sizes'
import { compose } from 'recompose'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { mapSizesToProps } from '../../utils/withSizes'
import Range from '../../components/WatchlistOverview/Range'
import ChartSignalCreationDialog from './ChartSignalCreationDialog'
import PercentChanges from '../../components/PercentChanges'
import WatchlistsPopup from '../../components/WatchlistPopup/WatchlistsPopup'
import ProjectIcon from '../../components/ProjectIcon'
import GetProjects from '../Signals/common/projects/getProjects'
import { TriggerProjectsSelector } from '../Signals/signalFormManager/signalCrudForm/formParts/projectsSelector/TriggerProjectsSelector'
import { formatNumber } from '../../utils/formatting'
import { PROJECT_BY_SLUG_QUERY } from './gql'
import ALL_PROJECTS from '../../allProjects.json'
import styles from './Header.module.scss'

const H1 = createSkeletonElement('h1')

const ProjectInfo = createSkeletonProvider(
  {
    name: '_______'
  },
  ({ name }) => name === undefined,
  () => ({
    color: 'var(--mystic)',
    backgroundColor: 'var(--mystic)'
  })
)(({ name, ticker, description }) => (
  <div className={styles.selector}>
    <ProjectIcon size={40} name={name} />
    <div className={styles.project}>
      <div className={styles.project__top}>
        <H1 className={styles.project__name}>
          {name} ({ticker})
        </H1>
        <div className={styles.project__arrows}>
          <Icon type='arrow-up' />
          <Icon type='arrow-down' />
        </div>
      </div>
      <div className={styles.project__description}>{description}</div>
    </div>
  </div>
))

const ProjectSelector = ({ slug, project, onChange }) => (
  <GetProjects
    render={({ allProjects }) => {
      const array =
        allProjects && allProjects.length === 0 ? ALL_PROJECTS : allProjects

      return (
        <TriggerProjectsSelector
          projects={array}
          target={{ slug }}
          isSingle={true}
          onChange={onChange}
          trigger={() => <ProjectInfo {...project} />}
        />
      )
    }}
  />
)

const PriceWithChanges = ({
  isTablet,
  percentChange24h,
  percentChange7d,
  priceUsd,
  ticker,
  totalSupply
}) => {
  const RANGES = [
    { range: '24h', value: percentChange24h },
    { range: '7d', value: percentChange7d }
  ]

  let [activeRange, setActiveRange] = useState(0)

  return (
    <div className={styles.projectInfo}>
      <div className={cx(styles.column, styles.column__first)}>
        <div className={styles.usdWrapper}>
          <span className={styles.price}>
            {priceUsd && formatNumber(priceUsd, { currency: 'USD' })}
          </span>
          <span className={styles.currency}>USD</span>
          {isTablet && (
            <Range
              range={RANGES[activeRange].range}
              className={styles.range}
              changeRange={() => {
                const nextRangeIndex = ++activeRange
                setActiveRange(
                  nextRangeIndex >= RANGES.length ? 0 : nextRangeIndex
                )
              }}
            >
              <PercentChanges changes={RANGES[activeRange].value} />
            </Range>
          )}
        </div>
        <div>
          <span className={styles.totalSupply}>
            {formatNumber(totalSupply)}
          </span>
          <span className={styles.currency}>{ticker}</span>
        </div>
      </div>
      {!isTablet && (
        <>
          <div className={styles.column}>
            <span
              className={cx(styles.changesLabel, styles.changesLabel__first)}
            >
              24h change
            </span>
            <PercentChanges changes={percentChange24h} label='24h' />
          </div>
          <div className={styles.column}>
            <span className={styles.changesLabel}>7d change</span>
            <PercentChanges changes={percentChange7d} label='7d' />
          </div>
        </>
      )}
    </div>
  )
}

const Header = ({
  data: { project = {} },
  slug,
  isLoggedIn,
  onSlugSelect,
  isTablet
}) => {
  const {
    id,
    ticker,
    totalSupply = 0,
    priceUsd = 0,
    percentChange24h = 0,
    percentChange7d = 0
  } = project

  return (
    <div className={styles.wrapper}>
      <ProjectSelector
        slug={slug}
        project={project}
        onChange={([project], closeDialog) => {
          onSlugSelect(project)
          closeDialog()
        }}
      />

      <PriceWithChanges
        isTablet={isTablet}
        totalSupply={totalSupply}
        percentChange7d={percentChange7d}
        percentChange24h={percentChange24h}
        ticker={ticker}
        priceUsd={priceUsd}
      />

      <div className={styles.actions}>
        <ChartSignalCreationDialog
          slug={slug}
          trigger={
            <Button
              accent='positive'
              border
              className={cx(styles.btn, styles.signal)}
            >
              <Icon type='signal' className={styles.btn__icon} />
              Add signal
            </Button>
          }
        />

        <WatchlistsPopup
          trigger={
            <Button accent='positive' border className={styles.btn}>
              <Icon type='add-watchlist' className={styles.btn__icon} />
              Watch {ticker}
            </Button>
          }
          projectId={id}
          slug={slug}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </div>
  )
}

export default compose(
  graphql(PROJECT_BY_SLUG_QUERY, {
    options: ({ slug }) => ({ variables: { slug } })
  }),
  withSizes(mapSizesToProps)
)(Header)
