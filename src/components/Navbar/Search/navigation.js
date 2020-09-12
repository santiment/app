import { useRef, useState, useEffect } from 'react'
import { push } from 'react-router-redux'
import { store } from '../../../redux'
import styles from './Category.module.scss'

const COLUMNS = ['Assets', 'Trending words', 'Insights', 'People']
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
    [isOpened, availableColumns]
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
        const href = getCursoredNode(
          suggestionsRef,
          cursor.columnName
        ).getAttribute('href')

        if (href.startsWith('http')) {
          window.location.href = href
        } else {
          store.dispatch(push(href))
        }
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
