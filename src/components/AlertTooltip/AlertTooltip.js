import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import styles from './AlertTooltip.module.scss'

const WarningTrigger = ({ forwardedRef, isActive, ...props }) => (
  <div
    ref={forwardedRef}
    {...props}
    className={cx('btn row hv-center', styles.btn, isActive && styles.btnHover)}
  >
    <Icon type='alert' />
  </div>
)

const ErrorTrigger = ({ forwardedRef, isActive, ...props }) => (
  <div
    ref={forwardedRef}
    {...props}
    className={cx('btn row hv-center', styles.btnError, isActive && styles.btnErrorHover)}
  >
    <Icon type='bell-off' />
  </div>
)

const AlertTooltip = ({ isVisible, content, type, tooltipClassname }) => {
  if (!isVisible) {
    return null
  }

  let trigger = <WarningTrigger />

  if (type === 'error') {
    trigger = <ErrorTrigger />
  }

  return (
    <Tooltip
      passOpenStateAs='isActive'
      trigger={trigger}
      position='bottom'
      className={cx(styles.tooltip, tooltipClassname, 'border box')}
    >
      <div className='relative row body-3'>{content}</div>
    </Tooltip>
  )
}

export default AlertTooltip
