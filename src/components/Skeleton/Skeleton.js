import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import styles from './Skeleton.module.scss'

const Skeleton = ({ className, wrapperClassName, centered, show, repeat }) => {
  const elem = new Array(repeat).fill(0)
  return (
    <div
      className={cx(
        styles.wrapper,
        centered && styles.centered,
        wrapperClassName
      )}
    >
      <CSSTransition
        in={show}
        timeout={1000}
        classNames={{ exit: styles.animated, exitActive: styles.fadeOut }}
        unmountOnExit
      >
        <div>
          {elem.map((_, idx) => (
            <div className={cx(styles.skeleton, className)} key={idx} />
          ))}
        </div>
      </CSSTransition>
    </div>
  )
}

Skeleton.propTypes = {
  repeat: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired
}

export default Skeleton
