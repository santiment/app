import React, { useState, useRef, useEffect } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Loader from '@santiment-network/ui/Loader/Loader'
import throttle from 'lodash.throttle'
import { useUpdateWatchlist } from '../../gql/hooks'
import Trigger from './Trigger'
import { metrics } from './metrics'
import Category from './Category'
import { getCategoryGraph } from '../../../Studio/Sidebar/utils'
import { countCategoryActiveMetrics } from '../../../SANCharts/ChartMetricSelector'
import { getActiveBaseMetrics } from './utils'
import { useAvailableMetrics } from '../../gql/hooks'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'
import styles from './index.module.scss'

const VIEWPORT_HEIGHT = window.innerHeight

const Filter = ({ watchlist = {}, projectsCount, isAuthor }) => {
  if (!watchlist.function) {
    return null
  }

  const { filters = [] } = watchlist.function.args
  const isNoFilters = watchlist.function.name === 'top_all_projects'
  const [isActive, setIsActive] = useState(false)
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

    if (!tableHeader) {
      return
    }

    function changeFilterHeight () {
      requestAnimationFrame(() => {
        const { bottom, top } = tableHeader.getBoundingClientRect()

        if (!sidebar) {
          return
        }

        if (top > 0) {
          sidebarContent.style.height = `${VIEWPORT_HEIGHT - bottom - 30}px`
          sidebar.classList.remove(styles.fixed)
        } else {
          sidebar.classList.add(styles.fixed)
        }
      })
    }

    throttle(changeFilterHeight, 200)

    window.addEventListener('scroll', changeFilterHeight)
    return () => window.removeEventListener('scroll', changeFilterHeight)
  }, [])

  function resetAll () {
    const func = {
      args: {
        size: 10000
      },
      name: 'top_all_projects'
    }
    updateFilter([])
    updateWatchlist(watchlist, { function: func })
  }

  function updMetricInFilter (metric, key, alternativeKey = key) {
    const filters = isNoFilters
      ? []
      : filter.filter(
        item =>
          !item.metric.includes(key) && !item.metric.includes(alternativeKey)
      )
    const newFilter = [...filters, metric]
    updateFilter(newFilter)
    updateWatchlist(watchlist, {
      function:
        newFilter.length > 0
          ? {
            args: {
              filters: newFilter
            },
            name: 'selector'
          }
          : {
            args: {
              size: 10000
            },
            name: 'top_all_projects'
          }
    })
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

    updateFilter(newFilter)
    updateWatchlist(watchlist, {
      function:
        newFilter.length > 0
          ? {
            args: {
              filters: newFilter
            },
            name: 'selector'
          }
          : {
            args: {
              size: 10000
            },
            name: 'top_all_projects'
          }
    })
  }

  const categories = getCategoryGraph(metrics)
  const activeBaseMetrics = getActiveBaseMetrics(filter)
  const categoryActiveMetricsCounter = countCategoryActiveMetrics(
    activeBaseMetrics
  )

  return (
    <>
      <Trigger isActive={isActive} onClick={setIsActive} />
      <section
        className={cx(styles.wrapper, isActive && styles.active)}
        ref={filterRef}
      >
        <Icon
          type='close'
          className={styles.closeIcon}
          onClick={() => setIsActive(!isActive)}
        />
        <div className={cx(styles.top, !isAuthor && styles.top__column)}>
          <span className={styles.count}>{projectsCount} assets</span>
          {!isNoFilters && isAuthor && (
            <Button
              className={styles.button}
              onClick={() => (isNoFilters ? null : resetAll())}
            >
              Reset all
            </Button>
          )}
          {!isAuthor && (
            <Button className={styles.button} disabled>
              View only. You aren't the author of this list
            </Button>
          )}
          {loading && <Loader className={styles.loader} />}
        </div>
        <div className={styles.content} ref={filterContentRef}>
          {isActive &&
            Object.keys(categories).map(key => (
              <Category
                key={key}
                title={key}
                counter={categoryActiveMetricsCounter[key]}
                groups={categories[key]}
                toggleMetricInFilter={toggleMetricInFilter}
                availableMetrics={availableMetrics}
                isAuthor={isAuthor}
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
