import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Toggle from '../../../../components/VisibilityIndicator/Toggle'
import styles from './Toggle.module.scss'

const PublicityToggle = ({ isActive, onClick, className, ...props }) => (
  <Button
    className={cx(styles.wrapper, className)}
    onClick={onClick}
    {...props}
    type='button'
  >
    <span className={styles.text}>{isActive ? 'Public' : 'Private'}</span>
    <Toggle isActive={isActive} className={styles.toggle} />
  </Button>
)

export default PublicityToggle
