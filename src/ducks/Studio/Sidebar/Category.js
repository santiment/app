import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import {
  HOLDER_DISTRIBUTION_NODE,
  HOLDER_DISTRIBUTION_COMBINED_BALANCE_NODE,
  PRICE_DAA_DIVERGENCE_NODE,
  ADJUSTED_PRICE_DAA_DIVERGENCE_NODE
} from './nodes'
import Group from './Group'
import Button from './Button'
import styles from './MetricSelector/index.module.scss'

const DEFAULT_OPENED_CATEGORY = {
  Financial: true,
  'Santiment Insights': true,
  'Santiment Alerts': true
}

const WidgetButton = ({ project, widget, toggleMetric }) => (
  <Button
    project={project}
    metric={widget}
    label={widget.label}
    onClick={() => toggleMetric(widget)}
  />
)

const Category = ({
  title,
  groups,
  hasTopHolders,
  hasDivergence,
  project,
  NewMetricsCategory,
  ...rest
}) => {
  const [hidden, setHidden] = useState(!DEFAULT_OPENED_CATEGORY[title])
  const { toggleMetric } = rest

  function onToggleClick () {
    setHidden(!hidden)
  }

  return (
    <div className={cx(styles.category, hidden && styles.category_hidden)}>
      <h3
        className={cx(styles.title, NewMetricsCategory[title] && styles.news)}
        onClick={onToggleClick}
      >
        <Icon type='arrow-right-small' className={styles.toggle} />
        {title}
      </h3>
      <div className={styles.metrics}>
        {/* TODO: Find a better way to extend metrics categories with custom metrics [@vanguard | April 3, 2020] */}
        {hasTopHolders && (
          <>
            <WidgetButton
              project={project}
              widget={HOLDER_DISTRIBUTION_NODE}
              toggleMetric={toggleMetric}
            />
            <WidgetButton
              project={project}
              widget={HOLDER_DISTRIBUTION_COMBINED_BALANCE_NODE}
              toggleMetric={toggleMetric}
            />
          </>
        )}
        {hasDivergence && (
          <>
            <WidgetButton
              project={project}
              widget={PRICE_DAA_DIVERGENCE_NODE}
              toggleMetric={toggleMetric}
            />
            <WidgetButton
              project={project}
              widget={ADJUSTED_PRICE_DAA_DIVERGENCE_NODE}
              toggleMetric={toggleMetric}
            />
          </>
        )}
        {Object.keys(groups).map(group => (
          <Group
            key={group}
            title={group}
            nodes={groups[group]}
            project={project}
            {...rest}
          />
        ))}
      </div>
    </div>
  )
}

Category.defaultProps = {
  NewMetricsCategory: {},
  NewMetricsGroup: {},
  NewMetric: {}
}

export default Category
