import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import styles from './Responsive.module.scss'

// TODO: Implement with js that will ignore the rendering of component as well
const MobileOnly = ({ children, className }) => (
  <div className={cx(styles.mobile, className)}>{children}</div>
)

MobileOnly.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string
}

MobileOnly.defaultProps = {
  className: ''
}

export default MobileOnly
