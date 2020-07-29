import React, { useState, useRef, useEffect } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Loader from '@santiment-network/ui/Loader/Loader'
import throttle from 'lodash.throttle'
import { store } from '../../../../index'
import { showNotification } from '../../../../actions/rootActions'
import { useUpdateWatchlist } from '../../gql/hooks'
import Trigger from './Trigger'
import { metrics } from './metrics'
import Category from './Category'
import { DEFAULT_SCREENER_FUNCTION } from '../../utils'
import { getCategoryGraph } from '../../../Studio/Sidebar/utils'
import { countCategoryActiveMetrics } from '../../../SANCharts/ChartMetricSelector'
import { getActiveBaseMetrics, getNewFunction } from './utils'
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
  isDefaultScreener
}) => {
  if (!screenerFunction) {
    return null
  }

  const isViewMode = !isAuthor && (isLoggedIn || !isDefaultScreener)
  const { filters = [] } = screenerFunction.args
  const isNoFilters = screenerFunction.name === 'top_all_projects'
  const filterRef = useRef(null)
  const filterContentRef = useRef(null)
  const [filter, updateFilter] = useState(filters)
  const [updateWatchlist, { loading }] = useUpdateWatchlist()
  const [availableMetrics] = useAvailableMetrics()
  const { isPro } = useUserSubscriptionStatus()

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
          sidebarContent.style.height = `${VIEWPORT_HEIGHT - bottom - 30}px`
          sidebar.classList.remove(styles.fixed)
        } else if (bottomTable > VIEWPORT_HEIGHT) {
          sidebar.classList.add(styles.fixed)
        }
      })
    }

    throttle(changeFilterHeight, 200)

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
  }

  function updMetricInFilter (metric, key, alternativeKey = key) {
    const filters = isNoFilters
      ? []
      : filter.filter(
        item =>
          !item.metric.includes(key) && !item.metric.includes(alternativeKey)
      )
    const newFilter = [...filters, metric]

    const newFunction = getNewFunction(newFilter)
    updateFilter(newFilter)

    if (watchlist.id) {
      updateWatchlist(watchlist, { function: newFunction })
    }
    setScreenerFunction(newFunction)
  }

  function toggleMetricInFilter (metric, key, alternativeKey = key) {
    const isMetricInList = filter.some(
      item => item.metric.includes(key) || item.metric.includes(alternativeKey)
    )
    let newFilter = []
    if (isMetricInList) {
      newFilter = filter.filter(
        item =>
          !item.metric.includes(key) && !item.metric.includes(alternativeKey)
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
                solidFill: true
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
                isNoFilters={isNoFilters}
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
