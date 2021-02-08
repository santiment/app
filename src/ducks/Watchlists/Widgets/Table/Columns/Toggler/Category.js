import React, { useMemo, useState, useEffect } from 'react'
import cx from 'classnames'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { NO_GROUP } from '../../../../../Studio/Sidebar/utils'
import Column from './Columns/Column'
import styles from './Category.module.scss'

const SortableItem = SortableElement(
  ({ column, currentSearch, filteredColumns, onColumnToggle }) => {
    const { key } = column
    const isHide = currentSearch && !filteredColumns.includes(key)
    return isHide ? null : (
      <Column
        key={key}
        draggable
        column={column}
        onColumnToggle={onColumnToggle}
        isActive={true}
        className={cx(
          styles.column,
          styles.column__active,
          currentSearch && styles.searchedColumn
        )}
      />
    )
  }
)

const SortableList = SortableContainer(({ columns, ...props }) => (
  <div className={styles.columns}>
    {columns.map((column, index) => (
      <SortableItem key={column.key} index={index} column={column} {...props} />
    ))}
  </div>
))

const Category = ({
  title,
  groups,
  columns,
  onColumnToggle,
  activeKeys,
  currentSearch
}) => {
  const [activeColumns, setActiveColumns] = useState(columns)

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

  useEffect(
    () => {
      setActiveColumns(columns)
    },
    [columns]
  )

  const isShowCategory =
    !currentSearch || (currentSearch && filteredColumns.length !== 0)

  function onSortEnd ({ newIndex, oldIndex }) {
    if (newIndex === oldIndex) return

    const newActiveColumns = activeColumns.slice()
    newActiveColumns.splice(oldIndex, 1)
    newActiveColumns.splice(newIndex, 0, activeColumns[oldIndex])

    setActiveColumns(newActiveColumns)
  }

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
                    const isActive = activeKeys && activeKeys.includes(key)
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
        <SortableList
          lockAxis='y'
          columns={activeColumns}
          onSortEnd={onSortEnd}
          currentSearch={currentSearch}
          filteredColumns={filteredColumns}
          onColumnToggle={onColumnToggle}
          helperClass={styles.dragged}
        />
      )}
    </div>
  ) : null
}

export default Category
