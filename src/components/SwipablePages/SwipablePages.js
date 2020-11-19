import React, { useState } from 'react'
import cx from 'classnames'
import ReactSwipe from 'react-swipe'
import styles from './SwipablePages.module.scss'

export const useSwipeState = () => {
  const [active, setActive] = useState(0)

  function onChange (value) {
    setActive(value)
  }

  return {
    onChange,
    active
  }
}

const SwipablePages = ({ pages }) => {
  const { active, onChange } = useSwipeState()

  return (
    <>
      <ReactSwipe
        className={styles.swipeContainer}
        swipeOptions={{
          callback: onChange,
          continuous: false,
          startSlide: active
        }}
      >
        {pages.map((ElWrapper, index) => {
          return <div key={index}>{ElWrapper}</div>
        })}
      </ReactSwipe>
      <div className={styles.dots}>
        {pages.map((item, index) => {
          return (
            <svg
              className={cx(styles.dot, index === active && styles.active)}
              key={index}
              width='6'
              height='6'
              viewBox='0 0 6 6'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='3' cy='3' r='3' fill='inherit' />
            </svg>
          )
        })}
      </div>
    </>
  )
}

export default SwipablePages
