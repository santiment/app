import React from 'react'
import cx from 'classnames'
import userPlaceholderSvg from './user-placeholder.svg'
import styles from './Avatar.module.scss'

const Avatar = ({
  className,
  avatarUrl,
  top,
  left,
  forwardedRef,
  ...props
}) => (
  <div
    {...props}
    ref={forwardedRef}
    className={cx(styles.wrapper, avatarUrl || styles.empty, className)}
    style={{
      left,
      top,
      '--author': `url("${avatarUrl || userPlaceholderSvg}")`
    }}
  />
)

export default Avatar
