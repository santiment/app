import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Group from './Group'
import MetricButton from './MetricButton'
import { TOP_HOLDERS_PANE } from '../../Chart/Sidepane/panes'
import styles from './index.module.scss'

const Category = ({
  title,
  groups,
  chartSidepane,
  hasTopHolders,
  toggleChartSidepane,
  ...rest
}) => {
  const [hidden, setHidden] = useState(false)

  function onToggleClick () {
    setHidden(!hidden)
  }

  return (
    <div className={cx(styles.category, hidden && styles.category_hidden)}>
      <h3 className={styles.title}>
        {title}
        <Icon
          type='arrow-up'
          className={styles.toggle}
          onClick={onToggleClick}
        />
      </h3>
      <div className={styles.metrics}>
        {/* TODO: Find a better way to extend metrics categories with custom metrics [@vanguard | April 3, 2020] */}
        {hasTopHolders && (
          <MetricButton
            label='Holders Distributions'
            isActive={chartSidepane === TOP_HOLDERS_PANE}
            isDisabled={rest.options.isMultiChartsActive}
            onClick={() => toggleChartSidepane(TOP_HOLDERS_PANE)}
          />
        )}
        {Object.keys(groups).map(group => (
          <Group key={group} title={group} metrics={groups[group]} {...rest} />
        ))}
      </div>
    </div>
  )
}

export default Category
