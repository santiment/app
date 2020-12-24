import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Search from '@santiment-network/ui/Search'
import Message from '@santiment-network/ui/Message'
import Loader from '@santiment-network/ui/Loader/Loader'
import Trigger from './Trigger'
import { metrics } from './dataHub/metrics'
import Category from './Category'
import EntryPoint from './EntryPoint'
import ToggleActiveFilters from './ToggleActiveFilters'
import { getCategoryGraph } from '../../../Studio/Sidebar/utils'
import { countCategoryActiveMetrics } from '../../../SANCharts/ChartMetricSelector'
import {
  getActiveBaseMetrics,
  getNewFunction,
  extractFilters,
  filterMetricsBySearch
} from './utils'
import { isContainMetric } from './detector'
import { useAvailableMetrics } from '../../gql/hooks'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'
import { APP_STATES } from '../../../Updates/reducers'
import {
  notifyLoginForSave,
  notifyOutdatedVersion
} from '../../Widgets/TopPanel/notifications'
import styles from './index.module.scss'

const Filter = ({
  watchlist = {},
  projectsCount,
  isAuthor,
  isAuthorLoading,
  screenerFunction,
  setScreenerFunction,
  isLoggedIn,
  isDefaultScreener,
  loading,
  history,
  appVersionState,
  isOpen,
  setIsOpen,
  updateWatchlistFunction
}) => {
  if (!screenerFunction) {
    return null
  }

  const isViewMode =
    !isAuthor && !isAuthorLoading && (isLoggedIn || !isDefaultScreener)
  const filters = extractFilters(screenerFunction.args)
  const [currentSearch, setCurrentSearch] = useState('')
  const [filter, updateFilter] = useState(filters)
  const [baseProjects, setBaseProjects] = useState(
    screenerFunction.args.baseProjects
  )
  const [isOutdatedVersion, setIsOutdatedVersion] = useState(false)
  const [isActiveFiltersOnly, setIsActiveFiltersOnly] = useState(false)
  const [isWereChanges, setIsWereChanges] = useState(false)
  const [availableMetrics] = useAvailableMetrics()
  const [isReset, setIsReset] = useState(false)
  const { isPro } = useUserSubscriptionStatus()

  const isNoFilters =
    filters.length === 0 || screenerFunction.name === 'top_all_projects'

  useEffect(
    () => {
      if (isOutdatedVersion && appVersionState !== APP_STATES.LATEST) {
        notifyOutdatedVersion()
      }
    },
    [isOutdatedVersion]
  )

  useEffect(
    () => {
      if (!isLoggedIn && !isViewMode && isWereChanges && isOpen) {
        notifyLoginForSave(history)
      }
    },
    [isWereChanges]
  )

  useEffect(
    () => {
      if (!isOpen) {
        setCurrentSearch('')
      }
    },
    [isOpen]
  )

  useEffect(
    () => {
      if (!isViewMode && baseProjects !== screenerFunction.args.baseProjects) {
        const newFunction = getNewFunction(filter, baseProjects)
        updateWatchlistFunction(newFunction)
        setScreenerFunction(newFunction)
      }
    },
    [baseProjects]
  )

  function resetAll () {
    const func = getNewFunction([], baseProjects)
    updateFilter([])

    if (!isNoFilters) {
      updateWatchlistFunction(func)
    }
    setScreenerFunction(func)
    setIsReset(true)
    setCurrentSearch('')
  }

  function updMetricInFilter (metric, key, alternativeKey = key) {
    if (isViewMode) {
      return
    }

    const filters = isNoFilters
      ? []
      : filter.filter(
        item =>
          !isContainMetric(item.args.metric || item.name, key) &&
            !isContainMetric(item.args.metric || item.name, alternativeKey)
      )
    const newFilter = [...filters, metric]

    const newFunction = getNewFunction(newFilter, baseProjects)
    updateFilter(newFilter)

    updateWatchlistFunction(newFunction)
    setScreenerFunction(newFunction)

    if (newFilter.length > 0 && isReset) {
      setIsReset(false)
    }

    if (!isWereChanges) {
      setIsWereChanges(true)
    }
  }

  function toggleMetricInFilter (metric, key, alternativeKey = key) {
    if (isViewMode) {
      return
    }

    const isMetricInList = filter.some(
      item =>
        isContainMetric(item.args.metric || item.name, key) ||
        isContainMetric(item.args.metric || item.name, alternativeKey)
    )
    let newFilter = []
    if (isMetricInList) {
      newFilter = filter.filter(
        item =>
          !isContainMetric(item.args.metric || item.name, key) &&
          !isContainMetric(item.args.metric || item.name, alternativeKey)
      )
    } else {
      newFilter = [...filter, metric]
    }

    const newFunction = getNewFunction(newFilter, baseProjects)
    updateFilter(newFilter)

    updateWatchlistFunction(newFunction)
    setScreenerFunction(newFunction)

    if (newFilter.length > 0 && isReset) {
      setIsReset(false)
    }

    if (!isWereChanges) {
      setIsWereChanges(true)
    }
  }

  const activeBaseMetrics = getActiveBaseMetrics(filter)

  const metricsSet = isActiveFiltersOnly ? activeBaseMetrics : metrics
  const filteredMetrics = filterMetricsBySearch(currentSearch, metricsSet)
  const categories = getCategoryGraph(filteredMetrics)

  activeBaseMetrics.forEach(metric => {
    if (metric === undefined && !isOutdatedVersion) {
      setIsOutdatedVersion(true)
    }
  })

  const categoryActiveMetricsCounter = countCategoryActiveMetrics(
    activeBaseMetrics
  )

  return (
    <>
      <Trigger
        isOpen={isOpen}
        onClick={setIsOpen}
        activeMetricsCount={activeBaseMetrics.length}
      />
      <section className={cx(styles.wrapper, isOpen && styles.active)}>
        <div className={styles.inner}>
          <div className={styles.top}>
            <div className={styles.row}>
              <span className={styles.count__assets}>
                {projectsCount} assets
              </span>
              {!loading && (
                <span className={styles.count__filters}>{`${
                  activeBaseMetrics.length
                } filter${
                  activeBaseMetrics.length !== 1 ? 's' : ''
                } activated`}</span>
              )}
              {loading && <Loader className={styles.loader} />}
              <Icon
                type='close-medium'
                className={styles.closeIcon}
                onClick={() => setIsOpen(false)}
              />
            </div>
            {!isViewMode && isOpen && (
              <Search
                autoFocus
                onChange={value => setCurrentSearch(value)}
                placeholder='Search metrics'
                className={styles.search}
              />
            )}
            <div className={styles.togglers}>
              <ToggleActiveFilters
                isActive={isActiveFiltersOnly}
                onClick={() => setIsActiveFiltersOnly(!isActiveFiltersOnly)}
              />
              {!isViewMode && (
                <Button
                  className={styles.button}
                  onClick={resetAll}
                  disabled={isReset || (!isWereChanges && isNoFilters)}
                >
                  Reset all
                </Button>
              )}
            </div>
            {isViewMode && !loading && (
              <Message
                variant='warn'
                icon='info-round'
                className={styles.message}
              >
                View only. You aren't the author of this screener
              </Message>
            )}
            <EntryPoint
              baseProjects={baseProjects}
              setBaseProjects={setBaseProjects}
              isViewMode={isViewMode}
            />
          </div>
          <div className={styles.content}>
            {Object.keys(categories).map(key => (
              <Category
                key={key}
                title={key}
                counter={categoryActiveMetricsCounter[key]}
                groups={categories[key]}
                toggleMetricInFilter={toggleMetricInFilter}
                availableMetrics={availableMetrics}
                isViewMode={isViewMode}
                isNoFilters={isReset}
                filters={filter}
                updMetricInFilter={updMetricInFilter}
                isActiveFiltersOnly={isActiveFiltersOnly}
                totalCounter={activeBaseMetrics.length}
                isPro={isPro}
                isOpen={isOpen}
              />
            ))}
          </div>
        </div>
      </section>
      {isOpen && (
        <div className={styles.background} onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}

const mapStateToProps = ({ app }) => ({
  appVersionState: app.appVersionState
})

export default connect(mapStateToProps)(Filter)
