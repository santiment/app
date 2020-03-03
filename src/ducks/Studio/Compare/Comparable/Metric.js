import React, { useState, useRef } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from '../Projects.module.scss'
import Search, { getMetricSuggestions } from '../../Sidebar/Search'
import withMetrics from '../../withMetrics'
import MetricIcon from '../../../SANCharts/MetricIcon'

const MetricSearch = withMetrics(
  ({ categories, loading, className, ...rest }) => (
    <Search
      {...rest}
      className={cx(className, loading && styles.loading)}
      categories={categories}
      emptySuggestions={getMetricSuggestions(categories)}
      inputProps={{
        placeholder: 'Type to search metrics...'
      }}
    />
  )
)

const Label = ({ comparable, editMetric, colors }) => {
  const { node, label } = comparable.metric

  return (
    <div className={styles.selected}>
      <MetricIcon
        node={node}
        color={colors[comparable.key]}
        className={styles.label}
      />
      {label}
      <Icon type='edit' className={styles.edit} onClick={editMetric} />
    </div>
  )
}

export default ({ comparable, slug, onSelect, colors }) => {
  const [isEditing, setEditing] = useState()
  const metricSelectorRef = useRef(null)

  function onMetricSelect (metric) {
    if (comparable) {
      stopEditing()
    }

    return onSelect(metric)
  }

  function editMetric () {
    setEditing(true)
    metricSelectorRef.current.firstElementChild.firstElementChild.focus()
  }

  function stopEditing () {
    setEditing()
  }

  return (
    <div className={styles.metric} ref={metricSelectorRef}>
      <MetricSearch
        slug={slug}
        toggleMetric={onMetricSelect}
        onBlur={stopEditing}
      />
      {isEditing ||
        (comparable && (
          <Label
            comparable={comparable}
            editMetric={editMetric}
            colors={colors}
          />
        ))}
    </div>
  )
}
