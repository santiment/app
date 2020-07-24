import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import styles from './NewBtn.module.scss'

const NewBtn = props => (
  <Button className={cx(styles.button, props.className)} {...props}>
    <Icon type='plus-round' className={styles.icon} />
    Create watchlist
  </Button>
)

export default NewBtn
