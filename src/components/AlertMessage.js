import React from 'react'
import cx from 'classnames'

const AlertMessage = ({ children, className }) => (
  <div className={cx('new-status-message', className)}>{children}</div>
)

export default AlertMessage
