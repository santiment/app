import React, { useEffect, useState, useRef } from 'react'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import UISearch from '@santiment-network/ui/Search'
import Suggestions from './Suggestions'
import styles from './index.module.scss'

const Search = () => {
  const [isOpened, setIsOpened] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const inputRef = useRef()

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

  return (
    <>
      <UISearch
        className={styles.search}
        forwardedRef={inputRef}
        placeholder='Search for asset, trend, etc'
        onChange={v => setSearchTerm(v)}
        onClick={openSuggestions}
        onBlur={closeSuggestions}
      >
        {isOpened && (
          <Suggestions inputRef={inputRef} searchTerm={searchTerm} />
        )}
      </UISearch>
    </>
  )
}

export default Search
