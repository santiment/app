import React, { useState, useEffect, useMemo } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Search from '@santiment-network/ui/Search'
import Message from '@santiment-network/ui/Message'
import Loader from '@santiment-network/ui/Loader/Loader'
import Trigger from './Trigger'
import { metrics, getActiveBaseMetrics } from './dataHub/metrics'
import Category from './Category'
import EntryPoint from './EntryPoint'
import ToggleActiveFilters from './ToggleActiveFilters'
import { getCategoryGraph } from '../../../Studio/Sidebar/utils'
import { countCategoryActiveMetrics } from '../../../SANCharts/ChartMetricSelector'
import { getNewFunction, extractFilters, filterMetricsBySearch } from './utils'
import { isContainMetric } from './detector'
import { useAvailableMetrics } from './hooks'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'
import { APP_STATES } from '../../../Updates/reducers'
import { notifyLoginForSave, notifyOutdatedVersion } from '../TopPanel/notifications'
import styles from './index.module.scss'

const Filter = ({
  projectsCount,
  isAuthor,
  isAuthorLoading,
  screenerFunction,
  setScreenerFunction,
  isLoggedIn,
  isDefaultScreener,
  loading,
  appVersionState,
  isOpen,
  setIsOpen,
  updateWatchlistFunction,
  closeClasses,
}) => {
  if (!screenerFunction) {
    return null
  }
  const isViewMode = !isAuthor && !isAuthorLoading && (isLoggedIn || !isDefaultScreener)
  const filters = useMemo(() => extractFilters(screenerFunction.args), [screenerFunction])
  const [currentSearch, setCurrentSearch] = useState('')
  const [filter, updateFilter] = useState(filters)
  const [baseProjects, setBaseProjects] = useState(screenerFunction.args.baseProjects)
  const [isOutdatedVersion, setIsOutdatedVersion] = useState(false)
  const [isActiveFiltersOnly, setIsActiveFiltersOnly] = useState(false)
  const [isWereChanges, setIsWereChanges] = useState(false)
  const { availableMetrics } = useAvailableMetrics()
  const [isReset, setIsReset] = useState(false)
  const { isPro } = useUserSubscriptionStatus()

  useEffect(() => {
    updateFilter(filters)
  }, [filters])

  const isNoFilters = useMemo(
    () => filters.length === 0 || screenerFunction.name === 'top_all_projects',
    [filters, screenerFunction],
  )

  useEffect(() => {
    if (isOutdatedVersion && appVersionState !== APP_STATES.LATEST) {
      notifyOutdatedVersion()
    }
  }, [isOutdatedVersion])

  useEffect(() => {
    if (isViewMode && !isActiveFiltersOnly) {
      setIsActiveFiltersOnly(true)
    }
  }, [isViewMode])

  useEffect(() => {
    if (!isLoggedIn && !isViewMode && isWereChanges && isOpen) {
      notifyLoginForSave()
    }
  }, [isWereChanges])

  useEffect(() => {
    if (!isOpen) {
      setCurrentSearch('')
    }
  }, [isOpen])

  useEffect(() => {
    if (!isViewMode && baseProjects !== screenerFunction.args.baseProjects) {
      const newFunction = getNewFunction(filter, baseProjects)
      updateWatchlistFunction(newFunction)
      setScreenerFunction(newFunction)
    }
  }, [baseProjects])

  function resetAll() {
    const func = getNewFunction([], baseProjects)
    updateFilter([])

    if (!isNoFilters) {
      updateWatchlistFunction(func)
    }
    setScreenerFunction(func)
    setIsReset(true)
    setCurrentSearch('')
  }

  function updMetricInFilter(metric, key, alternativeKey = key) {
    if (isViewMode) {
      return
    }

    const filters = isNoFilters
      ? []
      : filter.filter(
          (item) =>
            !isContainMetric(item.args.metric || item.name, key) &&
            !isContainMetric(item.args.metric || item.name, alternativeKey),
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

  function toggleMetricInFilter(metric, key, alternativeKey = key) {
    if (isViewMode) {
      return
    }

    const isMetricInList = filter.some(
      (item) =>
        isContainMetric(item.args.metric || item.name, key) ||
        isContainMetric(item.args.metric || item.name, alternativeKey),
    )
    let newFilter = []
    if (isMetricInList) {
      newFilter = filter.filter(
        (item) =>
          !isContainMetric(item.args.metric || item.name, key) &&
          !isContainMetric(item.args.metric || item.name, alternativeKey),
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
  const dynamicMetrics = metrics.filter((metric) => !metric.isStatic || metric.Widget)
  const metricsSet = isActiveFiltersOnly ? activeBaseMetrics : dynamicMetrics
  const filteredMetrics = filterMetricsBySearch(currentSearch, metricsSet)
  const categories = getCategoryGraph(filteredMetrics)

  activeBaseMetrics.forEach((metric) => {
    if (metric === undefined && !isOutdatedVersion) {
      setIsOutdatedVersion(true)
    }
  })

  const categoryActiveMetricsCounter = countCategoryActiveMetrics(activeBaseMetrics)

  return (
    <>
      <Trigger isOpen={isOpen} onClick={setIsOpen} activeMetricsCount={activeBaseMetrics.length} />
      <section className={cx(styles.wrapper, isOpen && styles.active)}>
        <div
          className={cx(closeClasses.wrapper, 'btn row v-center border')}
          onClick={() => setIsOpen(false)}
        >
          <Icon type='sidebar' className={closeClasses.icon} />
        </div>
        <div className={styles.inner}>
          <div className={styles.top}>
            <div className={styles.row}>
              <span className={styles.count__assets}>{projectsCount} assets</span>
              {!loading && (
                <span className={styles.count__filters}>{`${activeBaseMetrics.length} filter${
                  activeBaseMetrics.length !== 1 ? 's' : ''
                } activated`}</span>
              )}
              {loading && <Loader className={styles.loader} />}
            </div>
            {!isViewMode && isOpen && (
              <Search
                autoFocus
                onChange={(value) => setCurrentSearch(value)}
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
              <Message variant='warn' icon='info-round' className={styles.message}>
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
            {Object.keys(categories).map((key) => (
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
      {isOpen && <div className={styles.background} onClick={() => setIsOpen(false)} />}
    </>
  )
}

const mapStateToProps = ({ app }) => ({
  appVersionState: app.appVersionState,
})

export default connect(mapStateToProps)(Filter)
