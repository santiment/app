import React, { useState, useRef, useEffect } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Loader from '@santiment-network/ui/Loader/Loader'
import { store } from '../../../../redux'
import { showNotification } from '../../../../actions/rootActions'
import { useUpdateWatchlist } from '../../gql/hooks'
import Trigger from './Trigger'
import { metrics } from './dataHub/metrics'
import Category from './Category'
import { DEFAULT_SCREENER_FUNCTION } from '../../utils'
import { getCategoryGraph } from '../../../Studio/Sidebar/utils'
import { countCategoryActiveMetrics } from '../../../SANCharts/ChartMetricSelector'
import { getActiveBaseMetrics, getNewFunction, extractFilters } from './utils'
import { isContainMetric } from './detector'
import { useAvailableMetrics } from '../../gql/hooks'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'
import styles from './index.module.scss'

const VIEWPORT_HEIGHT = window.innerHeight

const Filter = ({
  watchlist = {},
  projectsCount,
  isAuthor,
  setIsOpen,
  isOpen,
  screenerFunction,
  setScreenerFunction,
  isLoggedIn,
  isDefaultScreener,
  history
}) => {
  if (!screenerFunction) {
    return null
  }

  const isViewMode = !isAuthor && (isLoggedIn || !isDefaultScreener)
  const filters = extractFilters(screenerFunction.args)

  const filterRef = useRef(null)
  const filterContentRef = useRef(null)
  const [filter, updateFilter] = useState(filters)
  const [updateWatchlist, { loading }] = useUpdateWatchlist()
  const [availableMetrics] = useAvailableMetrics()
  const [isReset, setIsReset] = useState(false)
  const { isPro } = useUserSubscriptionStatus()

  const isNoFilters =
    filters.length === 0 || screenerFunction.name === 'top_all_projects'

  useEffect(() => {
    const sidebar = filterRef.current
    const sidebarContent = filterContentRef.current
    const tableHeader = document.querySelector('#tableTop')
    const table = document.querySelector('#table')

    if (!tableHeader) {
      return
    }

    function changeFilterHeight () {
      requestAnimationFrame(() => {
        const { bottom, top } = tableHeader.getBoundingClientRect()
        const { bottom: bottomTable } = table.getBoundingClientRect()

        if (!sidebar) {
          return
        }

        if (top > 0) {
          sidebarContent.style.height = `${VIEWPORT_HEIGHT - bottom - 34}px`
          sidebar.classList.remove(styles.fixed)
        } else if (bottomTable > VIEWPORT_HEIGHT) {
          sidebar.classList.add(styles.fixed)
        }
      })
    }

    changeFilterHeight()

    window.addEventListener('scroll', changeFilterHeight)
    return () => window.removeEventListener('scroll', changeFilterHeight)
  }, [])

  function resetAll () {
    const func = DEFAULT_SCREENER_FUNCTION
    updateFilter([])

    if (watchlist.id) {
      updateWatchlist(watchlist, { function: func })
    }
    setScreenerFunction(func)
    setIsReset(true)
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

    const newFunction = getNewFunction(newFilter)
    updateFilter(newFilter)

    if (watchlist.id) {
      updateWatchlist(watchlist, { function: newFunction })
    }
    setScreenerFunction(newFunction)

    if (newFilter.length > 0 && isReset) {
      setIsReset(false)
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

    const newFunction = getNewFunction(newFilter)

    updateFilter(newFilter)

    if (watchlist.id) {
      updateWatchlist(watchlist, { function: newFunction })
    }
    setScreenerFunction(newFunction)

    if (newFilter.length > 0 && isReset) {
      setIsReset(false)
    }
  }

  const categories = getCategoryGraph(metrics)
  const activeBaseMetrics = getActiveBaseMetrics(filter)
  const categoryActiveMetricsCounter = countCategoryActiveMetrics(
    activeBaseMetrics
  )

  return (
    <>
      <Trigger
        isOpen={isOpen}
        onClick={newIsOpenState => {
          setIsOpen(newIsOpenState)

          if (!isLoggedIn && newIsOpenState && !isViewMode) {
            store.dispatch(
              showNotification({
                variant: 'warning',
                title: `Log in to save your filter settings`,
                description:
                  "Your settings will be lost after refresh if you're not logged in to Sanbase",
                dismissAfter: 8000,
                actions: [
                  {
                    label: 'Log in',
                    onClick: () => history.push('/login')
                  },
                  {
                    label: 'Create an account',
                    onClick: () => history.push('/sign-up')
                  }
                ]
              })
            )
          }
        }}
        activeMetricsCount={activeBaseMetrics.length}
      />
      <section
        className={cx(styles.wrapper, isOpen && styles.active)}
        ref={filterRef}
      >
        <Icon
          type='close-medium'
          className={styles.closeIcon}
          onClick={() => setIsOpen(false)}
        />
        <div className={cx(styles.top, isViewMode && styles.top__column)}>
          <span className={styles.count}>{projectsCount} assets</span>
          {!isNoFilters && !isViewMode && (
            <Button
              className={styles.button}
              onClick={() => (isNoFilters ? null : resetAll())}
            >
              Reset all
            </Button>
          )}
          {isViewMode && (
            <Button className={styles.button} disabled>
              View only. You aren't the author of this list
            </Button>
          )}
          {loading && <Loader className={styles.loader} />}
        </div>
        <div className={styles.content} ref={filterContentRef}>
          {isOpen &&
            Object.keys(categories).map(key => (
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
                isPro={isPro}
              />
            ))}
        </div>
      </section>
    </>
  )
}

export default Filter
