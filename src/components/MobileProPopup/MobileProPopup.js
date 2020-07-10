import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import styles from './MobileProPopup.module.scss'

const MobileProPopup = () => {
  const [isShow, setIsShow] = useState(true)
  return isShow ? (
    <Button variant='fill' accent='orange' className={styles.wrapper}>
      <Link to='/pricing' className={styles.link}>
        <Icon type='crown' className={styles.crown} />
        Go PRO and get more data
      </Link>
      <Icon
        type='close-medium'
        onClick={() => setIsShow(false)}
        className={styles.close}
      />
    </Button>
  ) : null
}

export default MobileProPopup
