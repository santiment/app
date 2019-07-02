import React from 'react'
import PropTypes from 'prop-types'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import styles from './ShareBtn.module.scss'

const ShareBtn = ({ asIcon, className, ...props }) => {
  return (
    <Button
      {...props}
      className={`${className} ${styles.btn}`}
      border={!asIcon}
      variant={asIcon ? 'ghost' : 'flat'}
    >
      <Icon type='share' className={styles.icon} />
      {asIcon ? '' : <span className={styles.text}>Share</span>}
    </Button>
  )
}

ShareBtn.propTypes = {
  asIcon: PropTypes.bool,
  className: PropTypes.string
}

ShareBtn.defaultProps = {
  asIcon: false,
  className: ''
}

export default ShareBtn
