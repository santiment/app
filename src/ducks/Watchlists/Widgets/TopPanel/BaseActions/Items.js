import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import styles from './Items.module.scss'

export const Item = ({
  className,
  children,
  icon,
  variant = 'ghost',
  ...props
}) => (
  <Button
    {...props}
    fluid
    variant={variant}
    className={cx(styles.btn, className)}
  >
    {icon && <Icon type={icon} className={styles.icon} />}
    {children}
  </Button>
)

export const NonAuthorTrigger = props => (
  <Item {...props} icon='disk' border className={styles.saveAsNonAuthor}>
    Save as
  </Item>
)
