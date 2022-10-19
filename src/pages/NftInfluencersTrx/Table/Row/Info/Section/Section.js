import React from 'react'
import cx from 'classnames'

const Section = ({ title, className, children }) => (
  <div className={cx('column justify', className)}>
    <div className='txt-m c-casper'>{title}</div>
    {children}
  </div>
)

export default Section
