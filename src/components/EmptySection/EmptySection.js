import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import Image from './../../pages/SonarFeed/sonar_activity_artboard.png'
import styles from './EmptySection.module.scss'

const EmptySection = ({
  className = '',
  imgClassName = '',
  children = null
}) => (
  <div className={cx(styles.wrapper, className)}>
    <img alt='empty-section' src={Image} className={imgClassName} />
    {children}
  </div>
)

EmptySection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  imgClassName: PropTypes.string
}

export default EmptySection
