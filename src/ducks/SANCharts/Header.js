import React, { useState, useEffect } from 'react'
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
import PriceChangesWidget from '../../components/PriceChangesWidget/PriceChangesWidget'
import ProjectIcon from '../../components/ProjectIcon/ProjectIcon'
import GetProjects from '../Signals/common/projects/getProjects'
import { TriggerProjectsSelector } from '../Signals/signalFormManager/signalCrudForm/formParts/projectsSelector/TriggerProjectsSelector'
import { formatNumber } from '../../utils/formatting'
import { PROJECT_BY_SLUG_QUERY } from './gql'
import ALL_PROJECTS from '../../allProjects.json'
import ProjectSelectDialog from '../Studio/Compare/ProjectSelectDialog'
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
)(({ name, ticker, slug, description, logoUrl, darkLogoUrl, onClick }) => (
  <div className={styles.selector} onClick={onClick}>
    <ProjectIcon
      size={40}
      slug={slug}
      logoUrl={logoUrl}
      darkLogoUrl={darkLogoUrl}
    />
    <div className={styles.project}>
      <div className={styles.project__top}>
        <H1 className={styles.project__name}>
          {name} ({ticker})
        </H1>
        <div className={styles.project__arrows}>
          <Icon type='arrow-down' className={styles.project__arrow} />
        </div>
      </div>
      <div className={styles.project__description}>{description}</div>
    </div>
  </div>
))

export const ProjectSelector = ({
  slug,
  project,
  onChange,
  trigger = () => <ProjectInfo {...project} slug={slug} />
}) => (
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
          trigger={trigger}
        />
      )
    }}
  />
)

const PriceWithChanges = ({
  isTablet,
  isLaptop,
  percentChange24h,
  percentChange7d,
  priceUsd,
  ticker,
  slug,
  minmax,
  totalSupply
}) => {
  const RANGES = [
    { range: '24h', value: percentChange24h },
    { range: '7d', value: percentChange7d }
  ]

  let [activeRange, setActiveRange] = useState(0)

  const changeRange = () => {
    const nextRangeIndex = ++activeRange
    setActiveRange(nextRangeIndex >= RANGES.length ? 0 : nextRangeIndex)
  }

  return (
    <>
      <div className={styles.projectInfo}>
        <div className={cx(styles.column, styles.column__first)}>
          <span className={styles.text}>Price</span>
          <div className={styles.usdWrapper}>
            <span className={styles.price}>
              {priceUsd && formatNumber(priceUsd, { currency: 'USD' })}
            </span>
            <span className={styles.currency}>USD</span>
          </div>
          {(isTablet || isLaptop) && (
            <Range
              range={RANGES[activeRange].range}
              className={styles.range}
              changeRange={changeRange}
            >
              <PercentChanges changes={RANGES[activeRange].value} />
            </Range>
          )}
          <div>
            <span className={styles.totalSupply}>
              {formatNumber(totalSupply)}
            </span>
            <span className={styles.currency}>{ticker}</span>
          </div>
        </div>
        {!(isTablet || isLaptop) && (
          <>
            <div className={styles.column}>
              <span
                className={cx(styles.changesLabel, styles.changesLabel__first)}
              >
                {RANGES[activeRange].range} change
              </span>
              <PercentChanges
                changes={RANGES[activeRange].value}
                label={RANGES[activeRange].range}
              />
            </div>
          </>
        )}
      </div>
      {!isTablet && (
        <PriceChangesWidget
          className={styles.highLow}
          slug={slug}
          range={RANGES[activeRange].range}
          price={priceUsd}
          onRangeChange={changeRange}
          minmax={minmax}
        />
      )}
    </>
  )
}

const Header = ({
  data: { project = {}, minmax = {} },
  slug,
  isLoggedIn,
  isLoading,
  onSlugSelect,
  isTablet,
  isLaptop,
  className
}) => {
  const [isOpened, setIsOpened] = useState()
  const dataProject = isLoading ? {} : project

  const {
    id,
    ticker,
    totalSupply = 0,
    priceUsd = 0,
    percentChange24h = 0,
    percentChange7d = 0
  } = dataProject

  useEffect(
    () => {
      if (onSlugSelect && project && project.ticker) {
        onSlugSelect({ slug, ...project })
      }
    },
    [project]
  )

  function closeDialog () {
    setIsOpened(false)
  }

  function openDialog () {
    setIsOpened(true)
  }

  function onProjectSelect (project) {
    onSlugSelect(project)
    closeDialog()
  }

  return (
    <div className={styles.container}>
      <div className={cx(styles.wrapper, className)}>
        <div>
          <ProjectSelectDialog
            open={isOpened}
            activeSlug={slug}
            onOpen={openDialog}
            onClose={closeDialog}
            onSelect={onProjectSelect}
            trigger={
              <ProjectInfo {...project} slug={slug} onClick={openDialog} />
            }
          />

          <div className={styles.actions}>
            <WatchlistsPopup
              trigger={
                <Button border className={styles.btn}>
                  <Icon type='add-watchlist' className={styles.btn__icon} />
                  Watch
                </Button>
              }
              projectId={id}
              slug={slug}
              isLoggedIn={isLoggedIn}
            />
            <ChartSignalCreationDialog
              slug={slug}
              trigger={
                <Button border className={cx(styles.btn, styles.signal)}>
                  <Icon type='signal' className={styles.btn__icon} />
                  Add alert
                </Button>
              }
            />
          </div>
        </div>

        <PriceWithChanges
          isTablet={isTablet}
          isLaptop={isLaptop}
          totalSupply={totalSupply}
          percentChange7d={percentChange7d}
          percentChange24h={percentChange24h}
          ticker={ticker}
          priceUsd={priceUsd}
          minmax={minmax}
          slug={slug}
        />
      </div>
    </div>
  )
}

export default compose(
  graphql(PROJECT_BY_SLUG_QUERY, {
    skip: ({ slug }) => !slug,
    options: ({ slug }) => ({ variables: { slug } })
  }),
  withSizes(mapSizesToProps)
)(Header)
