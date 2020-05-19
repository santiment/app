import React from 'react'
import PropTypes from 'prop-types'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import styles from './ShareBtn.module.scss'

const ShareBtn = ({ className, ...props }) => {
  return (
    <Button variant='flat' {...props} className={`${className} ${styles.btn}`}>
      <Icon type='share' className={styles.icon} />
      <span className={styles.text}>Share</span>
    </Button>
  )
}

ShareBtn.propTypes = {
  className: PropTypes.string
}

ShareBtn.defaultProps = {
  className: ''
}

export default ShareBtn
