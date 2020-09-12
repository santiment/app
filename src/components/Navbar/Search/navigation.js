import { useRef, useState, useEffect } from 'react'
import styles from './Category.module.scss'

const COLUMNS = ['Assets', 'Trending words', 'Insights', 'People']
const COLUMNS_LENGTH = COLUMNS.length
const COLUMNS_MAX_INDEX = COLUMNS_LENGTH - 1
const DEFAULT_CURSORED_COLUMN = COLUMNS[0]
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

function findColumnIndex (ColumnItems) {
  for (let i = 0; i < COLUMNS_LENGTH; i++) {
    const column = COLUMNS[i]

    if (ColumnItems[column].length) {
      return i
    }
  }
}

function getAvailableColumns (ColumnItems) {
  const result = []

  return result
}

export function useCursorNavigation (isOpened) {
  const [ColumnItems, setColumnItems] = useState(DEFAULT_COLUMN_ITEMS)
  const [cursor, setCursor] = useState(DEFAULT_CURSOR)
  const [availableColumns, setAvailableColumns] = useState([])
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

      if (column === cursor.columnName) {
        const { length } = items

        if (length) {
          const newRowIndex = cursor.row < length ? cursor.row : length - 1
          setCursorRowColumn(newRowIndex)
        } else {
          // setCursorRowColumn(0, findColumnIndex(newColumnItems))
        }
      }

      setAvailableColumns(newAvailableColumns)
      return newColumnItems
    })
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
        newColumnIndex += newColumnIndex < availableColumns.length - 1 ? 1 : 0
        break
      case 'Enter':
        e.target.blur()
        console.log(getCursoredNode(suggestionsRef, cursor.columnName))
        return
      default:
        return
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
