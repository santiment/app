import { useCallback, useState } from 'react'
import { COLUMNS_SETTINGS, COMMON_SETTINGS } from './columns'

export const useVisibleItems = () => {
  const [visibleItems, setVisibleItems] = useState([])

  const changeVisibleItems = useCallback(
    ({ pageIndex, pageSize, rows }) => {
      const startIndex = pageIndex * pageSize
      const lastIndex = startIndex + pageSize

      const visibleSlugs = rows
        .slice(startIndex, lastIndex)
        .map(({ original: { slug } }) => slug)

      if (
        visibleSlugs.length > 0 &&
        JSON.stringify(visibleSlugs) !== JSON.stringify(visibleItems)
      ) {
        setVisibleItems(visibleSlugs)
      }
    },
    [setVisibleItems, visibleItems]
  )

  return {
    visibleItems,
    changeVisibleItems
  }
}

export const useColumns = () => {
  const hiddenColumns = COMMON_SETTINGS.hiddenColumns
  const pageSize = COMMON_SETTINGS.pageSize

  const [columns, setColumns] = useState(
    changeShowing(COLUMNS_SETTINGS, hiddenColumns)
  )

  function changeShowing (columns, hiddenColumns) {
    const modifiedColumns = JSON.parse(JSON.stringify(columns))
    hiddenColumns.forEach(name => (modifiedColumns[name].show = false))

    return modifiedColumns
  }

  const toggleColumn = ({ name, show, selectable }) => {
    const toggledColumns = Object.assign({}, columns)
    toggledColumns[name] = {
      ...toggledColumns[name],
      show: selectable ? !show : show
    }

    return setColumns(toggledColumns)
  }

  return {
    pageSize,
    columns,
    toggleColumn
  }
}
