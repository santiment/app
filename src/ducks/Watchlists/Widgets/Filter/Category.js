import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import FilterMetric from './FilterMetric'
import { NO_GROUP } from '../../../Studio/Sidebar/utils'
import styles from './Category.module.scss'

const DEFAULT_OPENED_CATEGORY = {
  Financial: true
}

const Category = ({ title, groups, ...rest }) => {
  const [isCollapsed, setIsCollapsed] = useState(
    !DEFAULT_OPENED_CATEGORY[title]
  )

  function onToggleClick () {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div
      className={cx(styles.category, isCollapsed && styles.category__collapsed)}
    >
      <h3 className={styles.title} onClick={onToggleClick}>
        <div>{title}</div>
        <Icon type='arrow-right' className={styles.toggle} />
      </h3>
      <div className={styles.metrics}>
        {groups &&
          Object.keys(groups).map(group => (
            <div key={group} className={styles.group}>
              {group !== NO_GROUP && (
                <h3 className={styles.group__title}>{group}</h3>
              )}
              {groups[group].map(({ item: metric }) => (
                <FilterMetric
                  key={metric.label}
                  baseMetric={metric}
                  {...rest}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Category
