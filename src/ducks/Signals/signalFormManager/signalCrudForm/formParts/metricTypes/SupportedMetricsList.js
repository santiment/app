import React, { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { SIGNAL_SUPPORTED_METRICS } from './metrics'
import Search from '../../../../../Studio/Sidebar/Search'
import MetricsList from './MetricsList'
import { DEFAULT_METRICS } from '../../../../../Studio/withMetrics'
import { getCategoryGraph } from '../../../../../Studio/Sidebar/utils'
import { PROJECT_METRICS_BY_SLUG_QUERY } from '../../../../../SANCharts/gql'
import { useProject } from '../../../../../../hooks/project'
import { useIsBetaMode } from '../../../../../../stores/ui'
import { SEARCH_PREDICATE_ONLY_METRICS } from '../../../../../Studio/Compare/Comparable/Metric'
import { METRIC } from '../../../../../Studio/Sidebar/Button/types'
import { useMergedTimeboundSubmetrics } from '../../../../../dataHub/timebounds'
import metricStyles from './TriggerFormMetricTypes.module.scss'

export function filterOnlyMetrics (submetrics) {
  const result = {}

  Object.keys(submetrics).forEach(key => {
    result[key] = submetrics[key].filter(({ type }) => !type || type === METRIC)
  })

  return result
}

const getByAvailable = (availableMetrics = DEFAULT_METRICS) =>
  SIGNAL_SUPPORTED_METRICS.filter(({ key }) => {
    return availableMetrics.indexOf(key) !== -1
  })

export function useAvailableMetrics (slug) {
  const { data, loading, error } = useQuery(PROJECT_METRICS_BY_SLUG_QUERY, {
    skip: !slug,
    variables: {
      slug
    }
  })

  return [
    data
      ? data.project
      : {
        availableMetrics: DEFAULT_METRICS
      },
    loading,
    error
  ]
}

const SupportedMetricsList = ({ onSelectMetric, availableMetrics, slug }) => {
  const [categories, setCategories] = useState({})

  const isBeta = useIsBetaMode()

  const metrics = useMemo(
    () => {
      return getByAvailable(availableMetrics)
    },
    [availableMetrics]
  )
  const AllSubmetrics = useMergedTimeboundSubmetrics(availableMetrics)

  useEffect(
    () => {
      const submetrics = filterOnlyMetrics(AllSubmetrics)
      const newCategories = getCategoryGraph(metrics, [], submetrics, isBeta)
      setCategories(newCategories)
    },
    [availableMetrics]
  )

  const [project] = useProject(slug)
  const categoriesKeys = Object.keys(categories)

  return (
    categoriesKeys.length > 0 && (
      <>
        <div className={metricStyles.choose}>
          <div className={metricStyles.chooseText}>
            or choose from the group of metrics
          </div>
          <div className={metricStyles.divider} />
        </div>

        <Search
          iconPosition='left'
          inputProps={{
            placeholder: 'Search for a metric'
          }}
          toggleMetric={onSelectMetric}
          className={metricStyles.search}
          categories={categories}
          searchPredicate={SEARCH_PREDICATE_ONLY_METRICS}
        />

        <div className={metricStyles.metrics}>
          {categoriesKeys.map(key => (
            <MetricsList
              key={key}
              metrikKey={key}
              list={categories[key]}
              onSelect={onSelectMetric}
              project={project}
              availableMetrics={metrics}
              isBeta={isBeta}
            />
          ))}
        </div>
      </>
    )
  )
}

export default SupportedMetricsList
