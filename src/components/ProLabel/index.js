import React from 'react'
import cx from 'classnames'
import { NavLink as Link } from 'react-router-dom'
import Label from '@santiment-network/ui/Label'
import styles from './index.module.scss'

export const ProLabel = ({ className }) => (
  <Label
    as={Link}
    to='/pricing'
    className={cx(styles.label, className)}
    variant='fill'
    accent='texas-rose'
  >
    PRO
  </Label>
)
