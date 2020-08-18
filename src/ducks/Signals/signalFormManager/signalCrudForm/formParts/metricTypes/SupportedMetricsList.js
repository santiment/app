import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { SIGNAL_SUPPORTED_METRICS } from './metrics'
import Search from '../../../../../Studio/Sidebar/Search'
import MetricsList from './MetricsList'
import { DEFAULT_METRICS } from '../../../../../Studio/withMetrics'
import { getCategoryGraph } from '../../../../../Studio/Sidebar/utils'
import { PROJECT_METRICS_BY_SLUG_QUERY } from '../../../../../SANCharts/gql'
import { useProject } from '../../../../../../hooks/project'
import metricStyles from './TriggerFormMetricTypes.module.scss'

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
    data ? data.project.availableMetrics : DEFAULT_METRICS,
    loading,
    error
  ]
}

const SupportedMetricsList = ({ onSelectMetric, availableMetrics, slug }) => {
  const [categories, setCategories] = useState({})

  useEffect(
    () => {
      const metrics = getByAvailable(availableMetrics)
      const newCategories = getCategoryGraph(metrics, [])
      setCategories(newCategories)
    },
    [slug, availableMetrics]
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
            placeholder: 'Search for a Metric'
          }}
          toggleMetric={onSelectMetric}
          className={metricStyles.search}
          categories={categories}
        />

        <div className={metricStyles.metrics}>
          {categoriesKeys.map(key => (
            <MetricsList
              key={key}
              metrikKey={key}
              list={categories[key]}
              onSelect={onSelectMetric}
              project={project}
            />
          ))}
        </div>
      </>
    )
  )
}

export default SupportedMetricsList
