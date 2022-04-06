import React, { useState } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import styles from './MobileProPopup.module.scss'

const MobileProPopup = () => {
  const [isShow, setIsShow] = useState(true)
  return (
    <Button
      variant='fill'
      accent='orange'
      className={cx(
        styles.wrapper,
        !isShow && styles.closeAnimation,
        isShow && styles.appearAnimation,
      )}
    >
      <Link to='/pricing' className={styles.link}>
        <Icon type='crown' className={styles.crown} />
        Go PRO and get more data
      </Link>
      <Icon type='close-medium' onClick={() => setIsShow(false)} className={styles.close} />
    </Button>
  )
}

export default MobileProPopup
