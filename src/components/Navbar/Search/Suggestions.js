import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { CSSTransition } from 'react-transition-group'
import RecentsCategory, { getRecents, clearRecents } from './RecentsCategory'
import AssetsCategory from './AssetsCategory'
import TrendingWordsCategory from './TrendingWordsCategory'
import InsightsCategory from './InsightsCategory'
import PeopleCategory from './PeopleCategory'
import styles from './Suggestions.module.scss'

const DEFAULT_RECENTS = []

const Suggestions = ({ suggestionsRef, isOpened, ...props }) => {
  const isNotSearched = !props.searchTerm
  const [recents, setRecents] = useState(DEFAULT_RECENTS)

  useEffect(
    () => {
      if (isNotSearched) {
        if (isOpened) {
          setRecents(getRecents().slice(0, 5))
        }
      } else {
        setRecents(DEFAULT_RECENTS)
      }
    },
    [isOpened, isNotSearched]
  )

  useEffect(
    () => {
      const dropdown = suggestionsRef.current
      if (isOpened && dropdown) {
        const { parentNode } = dropdown

        const dropdownWidth = dropdown.offsetWidth
        const availableWidth =
          parentNode.clientWidth +
          parseFloat(getComputedStyle(parentNode).marginLeft)

        dropdown.style.minWidth =
          (dropdownWidth > availableWidth ? dropdownWidth : availableWidth) +
          'px'
        dropdown.style.right = availableWidth / 2 + 'px'
      }
    },
    [isOpened]
  )

  function onRecentsClear () {
    clearRecents()
    setRecents(DEFAULT_RECENTS)
  }

  return (
    <CSSTransition in={isOpened} timeout={500} classNames={styles}>
      <div
        ref={suggestionsRef}
        className={cx(styles.dropdown, styles.exitDone)}
      >
        <RecentsCategory {...props} items={recents} onClear={onRecentsClear} />
        <AssetsCategory {...props} />
        <TrendingWordsCategory {...props} />
        <InsightsCategory {...props} />
        {recents.length === 0 && <PeopleCategory {...props} />}
      </div>
    </CSSTransition>
  )
}

export default Suggestions
