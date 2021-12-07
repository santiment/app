import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import styles from './NextStep.module.scss'

function NextStep ({ label, onClick, className, ...rest }) {
  return (
    <Button
      className={cx(styles.wrapper, className)}
      accent='positive'
      onClick={onClick}
      {...rest}
    >
      {label} <Icon className={styles.icon} type='pointer-right' />
    </Button>
  )
}

export default NextStep
