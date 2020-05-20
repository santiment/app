import React, { useState } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
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
  isBeta,
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
        {isBeta && hasTopHolders && !rest.options.isMultiChartsActive && (
          <MetricButton
            label='Holder Distribution'
            isActive={chartSidepane === TOP_HOLDERS_PANE}
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

const mapStateToProps = state => ({
  isBeta: state.rootUi.isBetaModeEnabled
})

export default connect(mapStateToProps)(Category)
