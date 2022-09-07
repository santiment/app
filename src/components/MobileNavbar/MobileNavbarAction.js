import React from 'react'
import cx from 'classnames'
import styles from './MobileNavbarAction.module.scss'

const MobileNavbarAction = ({ onClick, Icon, label, linkTo, isActive = false, href }) => {
  const handleOnClick = () => onClick(linkTo)

  if (href) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={cx(styles.btn, 'btn column v-center justify', isActive && styles.active)}
      >
        <Icon className={styles.btnIcon} />
        {label}
      </a>
    )
  }

  return (
    <button
      className={cx(styles.btn, 'btn column v-center justify', isActive && styles.active)}
      onClick={handleOnClick}
    >
      <Icon className={styles.btnIcon} />
      {label}
    </button>
  )
}

export default MobileNavbarAction
