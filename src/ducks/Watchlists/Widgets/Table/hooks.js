import { useState } from 'react'
import {
  COLUMNS_SETTINGS,
  COMMON_SETTINGS,
  CATEGORIES_SETTINGS
} from './columns'

export const useColumns = category => {
  const { hiddenColumns } = CATEGORIES_SETTINGS[category] || COMMON_SETTINGS
  const { pageSize } = COMMON_SETTINGS

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
