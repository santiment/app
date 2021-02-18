import { useRef, useState, useEffect } from 'react'
import styles from './Category.module.scss'

const NAV_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Enter'
])
const COLUMNS = [
  'Recently searched',
  'Assets',
  'Wallets',
  'Trending words',
  'Insights',
  'People'
]
const DEFAULT_COLUMNS = []
const DEFAULT_COLUMN_ITEMS = COLUMNS.reduce((acc, column) => {
  acc[column] = []
  return acc
}, {})
const DEFAULT_CURSOR = {
  row: 0,
  column: 0,
  columnName: undefined
}

const cursoredClassSelector = '.' + styles.button_cursored
const getCursoredNode = ({ current }) =>
  current.querySelector(cursoredClassSelector)

export function useCursorNavigation (isOpened, onSuggestionSelect) {
  const [ColumnItems, setColumnItems] = useState(DEFAULT_COLUMN_ITEMS)
  const [cursor, setCursor] = useState(DEFAULT_CURSOR)
  const [availableColumns, setAvailableColumns] = useState(DEFAULT_COLUMNS)
  const suggestionsRef = useRef()

  useEffect(() => (isOpened ? setCursorRowColumn(0, 0) : undefined), [
    isOpened,
    availableColumns
  ])

  function setCursorRowColumn (row, column = cursor.column) {
    setCursor({
      row,
      column,
      columnName: availableColumns[column]
    })
  }

  function registerCursorColumn (column, items) {
    setColumnItems(ColumnItems => {
      const newColumnItems = { ...ColumnItems }
      newColumnItems[column] = items

      const newAvailableColumns = Object.keys(ColumnItems).filter(
        column => newColumnItems[column].length
      )

      setAvailableColumns(newAvailableColumns)
      return newColumnItems
    })
  }

  function onKeyDown (e) {
    const { key } = e
    if (!NAV_KEYS.has(key)) return

    let newColumnIndex = cursor.column
    let newRowIndex = cursor.row

    e.preventDefault()

    if (key === 'ArrowUp') {
      newRowIndex -= 1
    } else if (key === 'ArrowDown') {
      newRowIndex += 1
    } else if (key === 'ArrowLeft') {
      newColumnIndex -= newColumnIndex > 0 ? 1 : 0
    } else if (key === 'ArrowRight') {
      newColumnIndex += newColumnIndex < availableColumns.length - 1 ? 1 : 0
    } else if (key === 'Enter') {
      e.target.blur()
      const { columnName, row } = cursor

      return onSuggestionSelect(
        getCursoredNode(suggestionsRef),
        ColumnItems[columnName][row],
        columnName
      )
    }

    const maxCursorIndex = ColumnItems[availableColumns[newColumnIndex]].length
    newRowIndex = newRowIndex % maxCursorIndex
    const nextCursor = newRowIndex < 0 ? maxCursorIndex - 1 : newRowIndex

    setCursorRowColumn(nextCursor, newColumnIndex)
  }

  return {
    suggestionsRef,
    cursor,
    registerCursorColumn,
    onKeyDown
  }
}
