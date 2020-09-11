import React, { useEffect, useState, useRef } from 'react'
import cx from 'classnames'
import UISearch from '@santiment-network/ui/Search'
import Suggestions from './Suggestions'
import styles from './index.module.scss'

const EDITABLE_TAGS = new Set(['INPUT', 'TEXTAREA'])

const Search = () => {
  const [isOpened, setIsOpened] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const inputRef = useRef()

  useEffect(() => {
    const input = inputRef.current
    if (!input) return

    function onKeyPress (e) {
      const { code, target } = e
      if (code === 'Slash' && !EDITABLE_TAGS.has(target.tagName)) {
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
    <UISearch
      className={cx(styles.search, isOpened && styles.search_focused)}
      forwardedRef={inputRef}
      placeholder='Search for asset, trend, etc'
      onChange={v => setSearchTerm(v)}
      onClick={openSuggestions}
      onBlur={closeSuggestions}
    >
      <Suggestions isOpened={isOpened} searchTerm={searchTerm} />
    </UISearch>
  )
}

export default Search
