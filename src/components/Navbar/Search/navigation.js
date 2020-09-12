import { useRef, useState, useEffect } from 'react'
import styles from './Category.module.scss'

const COLUMNS = ['Assets', 'Trending words', 'Insights', 'People']
const COLUMNS_MAX_INDEX = COLUMNS.length - 1
const DEFAULT_CURSORED_COLUMN = COLUMNS[0]
const DEFAULT_COLUMN_ITEMS = {}
const DEFAULT_CURSOR = {
  row: 0,
  column: 0,
  columnName: DEFAULT_CURSORED_COLUMN
}

const ColumnToIndex = {}
COLUMNS.forEach((column, index) => {
  ColumnToIndex[column] = index
})

const cursoredClassSelector = '.' + styles.button_cursored
const getCursoredNode = ({ current }) =>
  current.querySelector(cursoredClassSelector)

export function useCursorNavigation (isOpened) {
  const [ColumnItems, setColumnItems] = useState(DEFAULT_COLUMN_ITEMS)
  const [cursor, setCursor] = useState(DEFAULT_CURSOR)
  const suggestionsRef = useRef()

  useEffect(
    () => {
      if (isOpened) {
        setCursorRowColumn(0, 0)
      }
    },
    [isOpened]
  )

  function setCursorRowColumn (row, column = cursor.column) {
    setCursor({
      row,
      column,
      columnName: COLUMNS[column]
    })
  }

  function registerCursorColumn (column, items) {
    const newColumnItems = { ...ColumnItems }
    newColumnItems[column] = items

    if (column === cursor.columnName) {
      const { length } = items

      if (length) {
        /* const newRowIndex = rowIndex < length ? rowIndex : length - 1 */
        const newRowIndex = cursor.row < length ? cursor.row : length - 1
        // setCursorIndex(newRowIndex)
      } else {
        const newCursorColumn = Object.keys(ColumnItems)[0]
        // setCursoredColumn(newCursorColumn)
        // setCursorIndex(0)
      }
    }

    setColumnItems(newColumnItems)
  }

  function onKeyDown (e) {
    let newColumnIndex = cursor.column
    let newRowIndex = cursor.row

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        newRowIndex -= 1
        break
      case 'ArrowDown':
        e.preventDefault()
        newRowIndex += 1
        break
      case 'ArrowLeft':
        e.preventDefault()
        newColumnIndex -= newColumnIndex > 0 ? 1 : 0
        break
      case 'ArrowRight':
        e.preventDefault()
        newColumnIndex += newColumnIndex < COLUMNS_MAX_INDEX ? 1 : 0
        break
      case 'Enter':
        e.target.blur()
        console.log(getCursoredNode(suggestionsRef, cursor.columnName))
        return
      default:
        return
    }

    const maxCursorIndex = ColumnItems[cursor.columnName].length
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
