import React from 'react'
import { NO_GROUP } from '../../../../../Studio/Sidebar/utils'
import Column from './Column'
import styles from './index.module.scss'

const Category = ({ title, groups, columns, onColumnToggle }) => {
  return (
    <div className={styles.category}>
      <h3 className={styles.title}>{title}</h3>
      {groups ? (
        <div className={styles.groups}>
          {Object.keys(groups).map(group => (
            <div key={group} className={styles.group}>
              {group !== NO_GROUP && (
                <h3 className={styles.group__title}>{group}</h3>
              )}
              {groups[group].length > 0 && (
                <div className={styles.columns}>
                  {groups[group].map(({ item: metric }) => (
                    <Column
                      key={metric.label}
                      metric={metric}
                      onColumnToggle={onColumnToggle}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.columns}>
          {columns.map(column => (
            <Column
              key={column.label}
              metric={column}
              onColumnToggle={onColumnToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Category