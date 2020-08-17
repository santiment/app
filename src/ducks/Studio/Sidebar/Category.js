import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Group from './Group'
import Button from './Button'
import { WIDGET } from './Button/types'
import { useIsBetaMode } from '../../../stores/ui'
import styles from './MetricSelector/index.module.scss'

const DEFAULT_OPENED_CATEGORY = {
  Financial: true,
  'Santiment Insights': true,
  'Santiment Alerts': true
}

export const HOLDER_DISTRIBUTION_NODE = {
  key: 'holder_distribution',
  type: WIDGET,
  label: 'Holder Distribution',
  abbreviation: 'hd'
}

const Category = ({
  title,
  groups,
  hasTopHolders,
  project,
  NewMetricsCategory,
  ...rest
}) => {
  const [hidden, setHidden] = useState(!DEFAULT_OPENED_CATEGORY[title])
  const isBeta = useIsBetaMode()

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
          <Button
            metric={HOLDER_DISTRIBUTION_NODE}
            project={project}
            label='Holder Distribution'
            onClick={() => rest.toggleMetric(HOLDER_DISTRIBUTION_NODE)}
          />
        )}
        {Object.keys(groups).map(group => (
          <Group
            key={group}
            title={group}
            nodes={groups[group]}
            project={project}
            isBeta={isBeta}
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
