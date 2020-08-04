import React from 'react'
import cx from 'classnames'
import userPlaceholderSvg from './user-placeholder.svg'
import styles from './Avatar.module.scss'

const Avatar = ({ className, src, top, left, forwardedRef, ...props }) => (
  <div
    {...props}
    ref={forwardedRef}
    className={cx(styles.wrapper, !src && styles.empty, className)}
    style={{
      left,
      top,
      '--author': `url("${src || userPlaceholderSvg}")`
    }}
  />
)

export default Avatar
