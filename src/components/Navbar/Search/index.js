import React, { useEffect, useState, useRef } from 'react'
import cx from 'classnames'
import { push } from 'react-router-redux'
import UISearch from '@santiment-network/ui/Search'
import Suggestions from './Suggestions'
import { useCursorNavigation } from './navigation'
import { store } from '../../../redux'
import styles from './index.module.scss'

const EDITABLE_TAGS = new Set(['INPUT', 'TEXTAREA'])

const Search = () => {
  const inputRef = useRef()
  const [isOpened, setIsOpened] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { onKeyDown, ...props } = useCursorNavigation(
    isOpened,
    onSuggestionSelect
  )

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
    // setIsOpened(false)
  }

  function onSuggestionSelect (node, item) {
    const href = node.getAttribute('href')

    if (href.startsWith('http')) {
      window.location.href = href
    } else {
      store.dispatch(push(href))
    }

    closeSuggestions()
  }

  return (
    <UISearch
      className={cx(styles.search, isOpened && styles.search_focused)}
      forwardedRef={inputRef}
      placeholder='Search for asset, trend, etc'
      autoComplete='off'
      onChange={v => setSearchTerm(v)}
      onClick={openSuggestions}
      onBlur={closeSuggestions}
      onKeyDown={onKeyDown}
    >
      <Suggestions
        {...props}
        searchTerm={searchTerm}
        isOpened={isOpened}
        onSuggestionSelect={onSuggestionSelect}
      />
    </UISearch>
  )
}

export default Search
