import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import {
  HOLDER_DISTRIBUTION_NODE,
  HOLDER_DISTRIBUTION_COMBINED_BALANCE_NODE
} from './nodes'
import Group from './Group'
import Button from './Button'
import { useIsBetaMode } from '../../../stores/ui'
import styles from './MetricSelector/index.module.scss'

const DEFAULT_OPENED_CATEGORY = {
  Financial: true,
  'Santiment Insights': true,
  'Santiment Alerts': true
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
          <>
            <Button
              project={project}
              metric={HOLDER_DISTRIBUTION_NODE}
              label={HOLDER_DISTRIBUTION_NODE.label}
              onClick={() => rest.toggleMetric(HOLDER_DISTRIBUTION_NODE)}
            />
            <Button
              project={project}
              metric={HOLDER_DISTRIBUTION_COMBINED_BALANCE_NODE}
              label={HOLDER_DISTRIBUTION_COMBINED_BALANCE_NODE.label}
              onClick={() =>
                rest.toggleMetric(HOLDER_DISTRIBUTION_COMBINED_BALANCE_NODE)
              }
            />
          </>
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
