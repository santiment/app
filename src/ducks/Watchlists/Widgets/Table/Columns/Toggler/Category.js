import React, { useMemo } from 'react'
import cx from 'classnames'
import { NO_GROUP } from '../../../../../Studio/Sidebar/utils'
import Column from './Column'
import styles from './index.module.scss'

const Category = ({
  title,
  groups,
  columns,
  onColumnToggle,
  activeKeys,
  currentSearch
}) => {
  const rawItems = useMemo(
    () =>
      groups
        ? Object.values(groups)
          .flat()
          .map(({ item }) => item)
        : columns,
    [columns, groups]
  )

  const filteredColumns = useMemo(
    () => {
      const searchInput = currentSearch.toLowerCase()
      return rawItems
        .filter(
          ({ label, shortLabel = label }) =>
            label.toLowerCase().includes(searchInput) ||
            shortLabel.toLowerCase().includes(searchInput)
        )
        .map(({ key }) => key)
    },
    [currentSearch]
  )

  const isShowCategory =
    !currentSearch || (currentSearch && filteredColumns.length !== 0)
  return isShowCategory ? (
    <div className={styles.category}>
      <h3 className={styles.title}>{title}</h3>
      {groups ? (
        <>
          {Object.keys(groups).map(group => (
            <div
              key={group}
              className={cx(styles.group, currentSearch && styles.flatGroup)}
            >
              {group !== NO_GROUP && !currentSearch && (
                <h3 className={styles.group__title}>{group}</h3>
              )}
              {groups[group].length > 0 && (
                <div
                  className={cx(styles.columns, currentSearch && styles.flat)}
                >
                  {groups[group].map(({ item }) => {
                    const { key } = item
                    const isActive = activeKeys.includes(key)
                    const isHide =
                      isActive ||
                      (currentSearch && !filteredColumns.includes(key))
                    return isHide ? null : (
                      <Column
                        key={key}
                        column={item}
                        onColumnToggle={onColumnToggle}
                        isActive={false}
                        className={cx(
                          styles.column,
                          currentSearch && styles.searchedColumn
                        )}
                      />
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </>
      ) : (
        <div className={styles.columns}>
          {columns.map(column => {
            const { key } = column
            const isHide = currentSearch && !filteredColumns.includes(key)
            return isHide ? null : (
              <Column
                key={key}
                column={column}
                onColumnToggle={onColumnToggle}
                isActive={true}
                className={cx(
                  styles.column,
                  currentSearch && styles.searchedColumn
                )}
              />
            )
          })}
        </div>
      )}
    </div>
  ) : null
}

export default Category
