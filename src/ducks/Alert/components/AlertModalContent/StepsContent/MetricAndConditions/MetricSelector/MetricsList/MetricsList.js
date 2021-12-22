import React, { useMemo } from 'react'
import SelectedMetric from '../SelectedMetric/SelectedMetric'
import MetricCategory from './MetricCategory/MetricCategory'
import styles from './MetricsList.module.scss'

const MetricsList = ({ metricsList, project, onSelect, selectedMetric }) => {
  const listKeys = useMemo(() => Object.keys(metricsList), [metricsList])

  return (
    <div className={styles.wrapper}>
      {selectedMetric && <SelectedMetric metric={selectedMetric} />}
      {listKeys.map(category => (
        <MetricCategory
          defaultOpen={category === listKeys[0]}
          key={category}
          category={category}
          metricsList={metricsList}
          project={project}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

export default MetricsList
