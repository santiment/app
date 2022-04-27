import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './Type.module.scss'

const Type = ({ iconType, title, description, onClick }) => (
  <div className={cx(styles.wrapper, 'column')} onClick={onClick}>
    <div className={cx(styles.title, 'row v-center body-1 c-black')}>
      <Icon type={iconType} className={styles.icon} />
      {title}
    </div>
    <div className={cx(styles.description, 'body-3')}>{description}</div>
  </div>
)

export default Type
