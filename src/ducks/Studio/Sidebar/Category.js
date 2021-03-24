import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Group from './Group'
import styles from './MetricSelector/index.module.scss'

const DEFAULT_OPENED_CATEGORY = {
  Favorites: true,
  Financial: true,
  'Santiment Insights': true,
  'Santiment Alerts': true
}

const Category = ({
  title,
  groups,
  project,
  NewMetricsCategory,
  GroupNode,
  children,
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
        <Icon type='arrow-right-small' className={styles.toggle} />
        {title}
      </h3>
      <div className={styles.metrics}>
        {Object.keys(groups).map(group => (
          <GroupNode
            key={group}
            title={group}
            nodes={groups[group]}
            project={project}
            {...rest}
          />
        ))}
        {children}
      </div>
    </div>
  )
}

Category.defaultProps = {
  NewMetricsCategory: {},
  NewMetricsGroup: {},
  NewMetric: {},
  GroupNode: Group
}

export default Category
