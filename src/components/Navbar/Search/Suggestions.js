import React, { useEffect } from 'react'
import cx from 'classnames'
import { CSSTransition } from 'react-transition-group'
import AssetsCategory from './AssetsCategory'
import TrendingWordsCategory from './TrendingWordsCategory'
import InsightsCategory from './InsightsCategory'
import PeopleCategory from './PeopleCategory'
import styles from './Suggestions.module.scss'

const Suggestions = ({ suggestionsRef, isOpened, ...props }) => {
  useEffect(
    () => {
      const dropdown = suggestionsRef.current
      if (isOpened && dropdown) {
        const { parentNode } = dropdown

        const availableWidth =
          parentNode.clientWidth +
          parseFloat(getComputedStyle(parentNode).marginLeft)

        dropdown.style.minWidth = availableWidth + 'px'
        dropdown.style.right = availableWidth / 2 + 'px'
      }
    },
    [isOpened]
  )

  return (
    <CSSTransition in={isOpened} timeout={500} classNames={styles}>
      <div
        ref={suggestionsRef}
        className={cx(styles.dropdown, styles.exitDone)}
      >
        <AssetsCategory {...props} />
        <TrendingWordsCategory {...props} />
        <InsightsCategory {...props} />
        <PeopleCategory {...props} />
      </div>
    </CSSTransition>
  )
}

export default Suggestions
