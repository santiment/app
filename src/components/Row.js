import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import styles from './Row.module.scss'

const Row = ({ children, className }) => (
  <div className={cx(styles.row, className)}>{children}</div>
)

Row.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default Row
