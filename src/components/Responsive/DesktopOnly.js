import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import styles from './Responsive.module.scss'

// TODO: Implement with js that will ignore the rendering of component as well
const DesktopOnly = ({ children, className }) => (
  <div className={cx(styles.desktop, className)}>{children}</div>
)

DesktopOnly.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string
}

DesktopOnly.defaultProps = {
  className: ''
}

export default DesktopOnly
