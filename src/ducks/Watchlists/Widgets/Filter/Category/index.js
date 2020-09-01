import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import FilterMetric from '../Metric'
import { NO_GROUP } from '../../../../Studio/Sidebar/utils'
import styles from './index.module.scss'

const Category = ({
  title,
  groups,
  counter,
  isActiveFiltersOnly,
  isViewMode,
  ...rest
}) => {
  const [isCollapsed, setIsCollapsed] = useState(isViewMode && !counter)

  function onToggleClick () {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div
      className={cx(
        styles.category,
        isCollapsed && styles.category__collapsed,
        isActiveFiltersOnly && styles.category__onlyActive
      )}
    >
      <h3 className={styles.title} onClick={onToggleClick}>
        <div>
          {title}
          {!isActiveFiltersOnly && counter > 0 && (
            <span className={styles.counter}>({counter})</span>
          )}
        </div>
        {!isActiveFiltersOnly && (
          <Icon type='arrow-right' className={styles.toggle} />
        )}
      </h3>
      <div className={styles.metrics}>
        {groups &&
          Object.keys(groups).map(group => (
            <div key={group} className={styles.group}>
              {group !== NO_GROUP && (
                <h3 className={styles.group__title}>{group}</h3>
              )}
              {groups[group].map(({ item: metric }) =>
                metric.Widget ? (
                  <metric.Widget
                    {...rest}
                    key={metric.label}
                    baseMetric={metric}
                    isViewMode={isViewMode}
                  />
                ) : (
                  <FilterMetric
                    {...rest}
                    key={metric.label}
                    baseMetric={metric}
                    isViewMode={isViewMode}
                  />
                )
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Category
