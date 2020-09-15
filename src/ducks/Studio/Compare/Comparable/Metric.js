import React, { useState, useRef } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import withMetrics from '../../withMetrics'
import { getCategoryGraph } from '../../Sidebar/utils'
import Search, { getMetricSuggestions } from '../../Sidebar/Search'
import MetricIcon from '../../../SANCharts/MetricIcon'
import { METRIC } from '../../Sidebar/Button/types'
import styles from './Metric.module.scss'

const DEFAULT_COLOR = '#9faac4'

const CustomProjectCategories = {
  gold: getCategoryGraph(['price_usd']),
  's-and-p-500': getCategoryGraph(['price_usd']),
  'crude-oil': getCategoryGraph(['price_usd'])
}

export const SEARCH_PREDICATE_ONLY_METRICS = searchTerm => {
  const upperCaseSearchTerm = searchTerm.toUpperCase()
  return ({ label, abbreviation, type }) => {
    if (type && type !== METRIC) {
      return false
    }

    return (
      (abbreviation &&
        abbreviation.toUpperCase().includes(upperCaseSearchTerm)) ||
      (label && label.toUpperCase().includes(upperCaseSearchTerm))
    )
  }
}

const MetricSearch = withMetrics(
  ({ slug, categories, loading, className, ...rest }) => (
    <Search
      {...rest}
      searchPredicate={SEARCH_PREDICATE_ONLY_METRICS}
      className={cx(className, loading && styles.loading)}
      categories={CustomProjectCategories[slug] || categories}
      emptySuggestions={getMetricSuggestions({
        categories: CustomProjectCategories[slug] || categories
      })}
      inputProps={{
        placeholder: 'Type to search metrics...'
      }}
    />
  )
)

const Label = ({ comparable, editMetric, colors }) => {
  const { node, label } = comparable.metric
  const color = colors[comparable.key]

  return (
    <div className={styles.selected} onClick={editMetric}>
      <MetricIcon
        node={node}
        color={color || DEFAULT_COLOR}
        className={styles.label}
      />
      {label}
      <Icon type='edit-small' className={styles.edit} />
    </div>
  )
}

export default ({
  comparable,
  slug,
  colors,
  hiddenMetrics,
  onSelect,
  ...rest
}) => {
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
        noMarketSegments
        slug={slug}
        hiddenMetrics={hiddenMetrics}
        toggleMetric={onMetricSelect}
        onBlur={stopEditing}
      />
      {isEditing ||
        (comparable && (
          <Label
            {...rest}
            comparable={comparable}
            editMetric={editMetric}
            colors={colors}
          />
        ))}
    </div>
  )
}
