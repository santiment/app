import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import Image from './Image'
import styles from './EmptySection.module.scss'

const EmptySection = ({
  className = '',
  imgClassName = '',
  children = null
}) => (
  <div className={cx(styles.wrapper, className)}>
    <Image className={cx(styles.img, imgClassName)} />
    {children}
  </div>
)

EmptySection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  imgClassName: PropTypes.string
}

export default EmptySection
