import React, { useEffect, useState, useRef } from 'react'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import UISearch from '@santiment-network/ui/Search'
import Suggestions from './Suggestions'
import styles from './index.module.scss'

const Search = ({ ...props }) => {
  const [isOpened, setIsOpened] = useState(false)
  const [cursorColumn, setCursorColumn] = useState(0)
  const inputRef = useRef()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const input = inputRef.current
    if (!input) return

    function onKeyPress (e) {
      if (e.code === 'Slash') {
        e.preventDefault()
        openSuggestions()
        input.focus()
      }
    }

    window.addEventListener('keypress', onKeyPress)
    return () => window.removeEventListener('keypress', onKeyPress)
  }, [])

  function openSuggestions () {
    setIsOpened(true)
  }

  function closeSuggestions () {
    setIsOpened(false)
  }

  function onInputChange (value) {
    setSearchTerm(value)
  }

  /*
  function onKeyDown  (e)  {
    const { suggestions, cursor } = this.state
    const { key } =

    let newCursor = cursor
    let selectedSuggestion

    switch (key) {
      case 'ArrowUp':
        e.preventDefault()
        newCursor = cursor - 1
        break
      case 'ArrowDown':
        e.preventDefault()
        newCursor = cursor + 1
        break
      case 'Enter':
        e.target.blur()
        selectedSuggestion = suggestions[cursor]
        return selectedSuggestion && this.onSuggestionSelect(selectedSuggestion)
      default:
        return
    }

    const maxCursor = suggestions.length

    newCursor = newCursor % maxCursor

    const nextCursor = newCursor < 0 ? maxCursor - 1 : newCursor
    this.setState({ cursor: nextCursor })
  }
  */

  function registerColumn (column) {
    console.log(column)
  }

  return (
    <ContextMenu
      open={isOpened}
      forwardedRefPropName='wrapperRef'
      trigger={
        <UISearch
          forwardedRef={inputRef}
          placeholder='Search for asset, trend, etc'
          onChange={onInputChange}
        />
      }
      className={styles.tooltip}
      position='bottom'
      align='end'
      on='click'
      onOpen={openSuggestions}
      onClose={closeSuggestions}
    >
      <Suggestions searchTerm={searchTerm} cursorColumn={cursorColumn} />
    </ContextMenu>
  )
}

export default Search
