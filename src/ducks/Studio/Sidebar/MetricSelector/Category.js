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
  project = {},
  ...rest
}) => {
  const [hidden, setHidden] = useState(false)

  function onToggleClick() {
    setHidden(!hidden)
  }

  return (
    <div className={cx(styles.category, hidden && styles.category_hidden)}>
      <h3 className={styles.title} onClick={onToggleClick}>
        {title}
        <Icon type='arrow-up' className={styles.toggle} />
      </h3>
      <div className={styles.metrics}>
        {/* TODO: Find a better way to extend metrics categories with custom metrics [@vanguard | April 3, 2020] */}
        {isBeta && hasTopHolders && !rest.options.isMultiChartsActive && (
          <MetricButton
            metric={{
              isBeta: true,
              key: 'holder_distribution',
              type: 'widget',
            }}
            project={project}
            label='Holder Distribution'
            onClick={() =>
              rest.toggleMetric({
                key: 'holder_distribution',
                type: 'widget',
                label: 'Holder Distribution',
              })
            }
          />
        )}
        {Object.keys(groups).map((group) => (
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

const mapStateToProps = (state) => ({
  isBeta: state.rootUi.isBetaModeEnabled,
})

export default connect(mapStateToProps)(Category)
