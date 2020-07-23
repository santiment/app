import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import FilterMetric from './FilterMetric'
import { NO_GROUP } from '../../../Studio/Sidebar/utils'
import styles from './Category.module.scss'

const Category = ({ title, groups, counter, ...rest }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  function onToggleClick () {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div
      className={cx(styles.category, isCollapsed && styles.category__collapsed)}
    >
      <h3 className={styles.title} onClick={onToggleClick}>
        <div>
          {title}
          {counter > 0 && <span className={styles.counter}>({counter})</span>}
        </div>
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
