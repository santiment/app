import React from 'react'
import cx from 'classnames'
import UIButton from '@santiment-network/ui/Button'
import { CursorType } from '../../../Chart/cursor'
import styles from './index.module.scss'

const CursorIcon = () => (
  <svg width='18' height='18' xmlns='http://www.w3.org/2000/svg'>
    <path d='M.5 8.5h6v1h-6zM11.5 8.5h6v1h-6zM9.5.5v6h-1v-6zM9.5 11.5v6h-1v-6z' />
  </svg>
)

const Button = ({ className, isActive, ...props }) => (
  <UIButton
    {...props}
    variant='ghost'
    className={cx(styles.btn, className, isActive && styles.btn_active)}
  />
)

const CursorControl = ({ cursorType, toggleCursorType }) => (
  <Button isActive={cursorType === CursorType.FREE} onClick={toggleCursorType}>
    <CursorIcon />
  </Button>
)

const Controls = ({ chartCursor }) => (
  <div className={styles.wrapper}>
    <CursorControl {...chartCursor} />
  </div>
)

export default Controls
