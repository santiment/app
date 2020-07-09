import React, { useState } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Icon from '@santiment-network/ui/Icon'
import { WIDGET } from './types'
import Group from './Group'
import MetricButton from './MetricButton'
import styles from './index.module.scss'

const DEFAULT_OPENED_CATEGORY = {
  Financial: true
}

const HOLDER_DISTRIBUTION_NODE = {
  key: 'holder_distribution',
  type: WIDGET,
  label: 'Holder Distribution'
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

  function onToggleClick () {
    setHidden(!hidden)
  }

  return (
    <div className={cx(styles.category, hidden && styles.category_hidden)}>
      <h3
        className={cx(styles.title, NewMetricsCategory[title] && styles.news)}
        onClick={onToggleClick}
      >
        <Icon type='arrow-right-big' className={styles.toggle} />
        {title}
      </h3>
      <div className={styles.metrics}>
        {/* TODO: Find a better way to extend metrics categories with custom metrics [@vanguard | April 3, 2020] */}
        {hasTopHolders && (
          <MetricButton
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
            {...rest}
          />
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isBeta: state.rootUi.isBetaModeEnabled
})

export default connect(mapStateToProps)(Category)
