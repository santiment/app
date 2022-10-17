import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Tip from './Tip'
import styles from './tip.module.scss'

const TipPopup = () => {
  const [isOpened, setIsOpened] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsOpened(true), 3000)
  }, [])

  if (!isOpened) return null

  return (
    <div className={cx(styles.popupWrapper, 'fluid')}>
      <Tip
        className='relative'
        action={
          <button onClick={() => setIsOpened(false)} className={styles.action}>
            <Icon type='close-medium' />
          </button>
        }
      />
    </div>
  )
}

export default TipPopup
