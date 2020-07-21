import React, { useState, useRef, useEffect } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Loader from '@santiment-network/ui/Loader/Loader'
import { useUpdateWatchlist } from '../../gql/hooks'
import Trigger from './Trigger'
import { metrics } from './metrics'
import Category from './Category'
import { getCategoryGraph } from '../../../Studio/Sidebar/utils'
import { countCategoryActiveMetrics } from '../../../SANCharts/ChartMetricSelector'
import { getActiveBaseMetrics } from './utils'
import { useAvailableMetrics } from '../../gql/hooks'
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
  const [filter, updateFilter] = useState(filters)
  const [updateWatchlist, { loading }] = useUpdateWatchlist()
  const [availableMetrics] = useAvailableMetrics()

  useEffect(() => {
    const sidebar = filterRef.current
    const tableHeader = document.querySelector('#tableTop')

    if (!tableHeader) {
      return
    }

    function changeFilterHeight () {
      requestAnimationFrame(() => {
        const { top } = tableHeader.getBoundingClientRect()

        if (!sidebar) {
          return
        }

        if (top > 0) {
          sidebar.style.height = `${VIEWPORT_HEIGHT - top}px`
          sidebar.classList.remove(styles.fixed)
        } else {
          sidebar.classList.add(styles.fixed)
        }
      })
    }

    changeFilterHeight()

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

  function updMetricInFilter (metric) {
    const key = metric.metric.replace(`_change_${metric.dynamicFrom}`, '')
    const filters = isNoFilters
      ? []
      : filter.filter(item => !item.metric.includes(key))
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

  function toggleMetricInFilter (metric) {
    const key = metric.metric.replace(`_change_${metric.dynamicFrom}`, '')
    const isMetricInList = filter.some(item => item.metric.includes(key))
    let newFilter = []
    if (isMetricInList) {
      newFilter = filter.filter(item => !item.metric.includes(key))
    } else {
      newFilter = [...filter, metric]
    }

    // console.log(metric, newFilter)
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
          <Button
            className={cx(styles.reset, isNoFilters && styles.reset__disabled)}
            onClick={() => (isNoFilters ? null : resetAll())}
            disabled={!isAuthor}
          >
            {isAuthor
              ? 'Reset all'
              : "View only. You aren't the author of this list"}
          </Button>
          {loading && <Loader className={styles.loader} />}
        </div>
        {Object.keys(categories).map(key => (
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
          />
        ))}
      </section>
    </>
  )
}

export default Filter
