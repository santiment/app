import React, { useRef, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import AssetsCategory from './AssetsCategory'
import TrendingWordsCategory from './TrendingWordsCategory'
import InsightsCategory from './InsightsCategory'
import PeopleCategory from './PeopleCategory'
import styles from './Suggestions.module.scss'

const Suggestions = ({ isOpened, ...props }) => {
  const ref = useRef(null)

  useEffect(
    () => {
      const dropdown = ref.current
      if (isOpened && dropdown) {
        const { parentNode } = dropdown

        dropdown.style.width =
          parentNode.clientWidth +
          parseFloat(getComputedStyle(parentNode).marginLeft) +
          'px'
      }
    },
    [isOpened]
  )

  return (
    <CSSTransition
      in={isOpened}
      timeout={500}
      classNames={styles}
      unmountOnExit
    >
      <div ref={ref} className={styles.dropdown}>
        <AssetsCategory {...props} />
        <TrendingWordsCategory {...props} />
        <InsightsCategory {...props} />
        <PeopleCategory {...props} />
      </div>
    </CSSTransition>
  )
}

export default Suggestions
