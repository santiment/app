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
import Range from '../Watchlists/Widgets/WatchlistOverview/Range'
import ChartSignalCreationDialog from './ChartSignalCreationDialog'
import PercentChanges from '../../components/PercentChanges'
import AddToWatchlist from '../Watchlists/Actions/Add'
import PriceChangesWidget from '../../components/PriceChangesWidget/PriceChangesWidget'
import ProjectIcon from '../../components/ProjectIcon/ProjectIcon'
import GetProjects from '../Signals/common/projects/getProjects'
import { TriggerProjectsSelector } from '../Signals/signalFormManager/signalCrudForm/formParts/projectsSelector/TriggerProjectsSelector'
import { formatNumber } from '../../utils/formatting'
import { PROJECT_BY_SLUG_QUERY } from './gql'
import { useTheme } from '../../stores/ui/theme'
import {
  isShowHalloweenFeatures,
  addGrave,
  getCheckedGraves
} from '../../utils/halloween'
import ALL_PROJECTS from '../../allProjects.json'
import HalloweenPopup from '../../components/HalloweenPopup'
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
  const [checkedGraves, setCheckedGraves] = useState(new Set())
  const [knockNumber, setKnockNumber] = useState(0)
  const { isNightMode } = useTheme()
  const dataProject = isLoading ? {} : project
  const initialGraves = getCheckedGraves()

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
        if (knockNumber > 0) {
          setKnockNumber(0)
        }

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

  function onGraveZoneClick () {
    const newNumber = knockNumber + 1
    setKnockNumber(newNumber)

    if (newNumber === 3) {
      const graves = addGrave(slug)
      setCheckedGraves(graves)
    }
  }

  return (
    <div className={styles.container}>
      <div className={cx(styles.wrapper, className)}>
        <div>
          <div className={styles.headerProject}>
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
            {isNightMode &&
              isShowHalloweenFeatures() &&
              (checkedGraves.size > 0 && checkedGraves.size <= 3) && (
              <HalloweenPopup activeNumber={checkedGraves.size} />
            )}
            {isNightMode &&
              isShowHalloweenFeatures() &&
              !initialGraves.includes(slug) &&
              initialGraves.length < 3 && (
              <div className={styles.grave} onClick={onGraveZoneClick}>
                <svg
                  width='18'
                  height='21'
                  viewBox='0 0 18 21'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M15.3623 2.67413C13.6621 0.957189 11.4025 0.0136719 9 0.0136719C6.59746 0.0136719 4.3411 0.957189 2.64089 2.67413C0.940678 4.38787 0.00635583 6.66964 0.00635583 9.09583L0 20.0137H18V9.09583C18 6.66964 17.0625 4.39108 15.3623 2.67413Z'
                    fill='#FF5B5B'
                  />
                  <mask
                    id='mask0'
                    mask-type='alpha'
                    maskUnits='userSpaceOnUse'
                    x='0'
                    y='0'
                    width='18'
                    height='21'
                  >
                    <path
                      d='M15.3623 2.67413C13.6621 0.957189 11.4025 0.0136719 9 0.0136719C6.59746 0.0136719 4.3411 0.957189 2.64089 2.67413C0.940678 4.38787 0.00635583 6.66964 0.00635583 9.09583L0 20.0137H18V9.09583C18 6.66964 17.0625 4.39108 15.3623 2.67413Z'
                      fill='#FF5B5B'
                    />
                  </mask>
                  <g mask='url(#mask0)'>
                    <path
                      d='M12.3242 9.87281H9.81356V15.7136H8.54237V9.87281H6V8.58911H8.54237V6.31055H9.81356V8.58911H12.3242V9.87281Z'
                      fill='white'
                    />
                    <path
                      d='M13 6.5L11 -0.5L17.5 3L18.5 8.5L15.5 10.5L13 6.5Z'
                      className={cx(knockNumber > 0 && styles.gravePart)}
                    />
                    <path
                      d='M9.2 7.37931L7 0.344828L10.85 -2L18 5.62069L16.9 10.8966L14.7 13.2414L10.85 15L9.2 7.37931Z'
                      className={cx(knockNumber > 1 && styles.gravePart)}
                    />
                    <path
                      d='M-0.810139 7.39345L-4 13.9423L1.42745 8.81575L3.66503 10.2381L4.20919 5.68308L10.9595 -0.440473L3.83862 -1.29117L-0.810139 7.39345Z'
                      className={cx(knockNumber > 0 && styles.gravePart)}
                    />
                    <path
                      d='M1.3605 3.99196L-1.37091e-06 6.95012L2.29218 4.62338L3.22386 5.2548L3.46891 3.20361L6.31882 0.423385L3.34 0.0675215L1.3605 3.99196Z'
                      className={cx(knockNumber > 1 && styles.gravePart)}
                    />
                  </g>
                </svg>
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <AddToWatchlist
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
