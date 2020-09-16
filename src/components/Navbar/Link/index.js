import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './index.module.scss'

const LinkWithArrow = ({ to, title, className, as: El = 'a' }) => (
  <El
    href={to}
    target='_blank'
    rel='noopener noreferrer'
    className={cx(styles.link, className)}
  >
    {title} <Icon className={styles.linkArrow} type='pointer-right' />
  </El>
)

export default LinkWithArrow
