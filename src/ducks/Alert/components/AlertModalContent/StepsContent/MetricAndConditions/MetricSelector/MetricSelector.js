import React, { useEffect, useMemo, useState } from 'react'
import { useField } from 'formik'
import Search from '../../../../../../Studio/Sidebar/Search'
import MetricsList from './MetricsList/MetricsList'
import { SEARCH_PREDICATE_ONLY_METRICS } from '../../../../../../Studio/Compare/Comparable/Metric'
import { useMergedTimeboundSubmetrics } from '../../../../../../dataHub/timebounds'
import { getCategoryGraph } from '../../../../../../Studio/Sidebar/utils'
import { useProject } from '../../../../../../../hooks/project'
import { useIsBetaMode } from '../../../../../../../stores/ui'
import { filterOnlyMetrics, getByAvailable } from './utils'
import styles from './MetricSelector.module.scss'

const searchProps = {
  iconPosition: 'left',
  inputProps: {
    placeholder: 'Search for a metric'
  },
  className: styles.search,
  searchPredicate: SEARCH_PREDICATE_ONLY_METRICS
}

const MetricSelector = ({ metrics, target }) => {
  const [, , { setValue: setMetric }] = useField('settings.metric')
  const isBeta = useIsBetaMode()
  const [project] = useProject(target.slug)
  const [categories, setCategories] = useState({})

  const allMetrics = useMemo(
    () =>
      getByAvailable(
        metrics.some(m => m.includes('nvt'))
          ? metrics.concat('nvt_5min')
          : metrics,
        target
      ),
    [metrics, target]
  )

  const allSubmetrics = useMergedTimeboundSubmetrics(metrics)

  useEffect(() => {
    const submetrics = filterOnlyMetrics(allSubmetrics)
    const newCategories = getCategoryGraph(allMetrics, [], submetrics, isBeta)
    setCategories(newCategories)
  }, [metrics, allMetrics, isBeta])

  function handleSelectMetric (metric) {
    setMetric(metric)
  }

  return (
    <>
      <Search
        {...searchProps}
        categories={categories}
        toggleMetric={handleSelectMetric}
        project={project}
      />
      <MetricsList
        metricsList={categories}
        project={project}
        onSelect={handleSelectMetric}
      />
    </>
  )
}

export default MetricSelector
