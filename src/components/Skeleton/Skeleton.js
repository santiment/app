import React from 'react'
import cx from 'classnames'
import { CSSTransition } from 'react-transition-group'
import styles from './Skeleton.module.scss'

const Skeleton = ({ className, show, repeat }) => {
  const elem = new Array(repeat).fill(0)
  return (
    <div className={styles.wrapper}>
      <CSSTransition
        in={show}
        timeout={1000}
        classNames={{ exit: styles.animated, exitActive: styles.fadeOut }}
        unmountOnExit
      >
        <div>
          {elem.map((_, idx) => (
            <div className={cx(styles.skeleton, className)} key={idx}>
              <div className={styles.effect} />
            </div>
          ))}
        </div>
      </CSSTransition>
    </div>
  )
}

export default Skeleton
