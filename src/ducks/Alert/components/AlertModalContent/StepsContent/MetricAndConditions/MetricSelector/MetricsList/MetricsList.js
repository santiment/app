import React, { useMemo } from 'react'
import MetricCategory from './MetricCategory/MetricCategory'
import styles from './MetricsList.module.scss'

const MetricsList = ({ metricsList, project, onSelect }) => {
  const listKeys = useMemo(() => Object.keys(metricsList), [metricsList])

  return (
    <div className={styles.wrapper}>
      {listKeys.map(category => (
        <MetricCategory
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
