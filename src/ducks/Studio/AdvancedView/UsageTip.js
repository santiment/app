import React, { useState } from 'react'
import Icon from '@santiment-network/ui/Icon'
import { getSavedToggle, saveToggle } from '../../../utils/localStorage'
import styles from './UsageTip.module.scss'

const USAGE_TIP_TOGGLE = 'IS_USAGE_TIP_OPENED'

export default () => {
  const [isOpened, setIsOpened] = useState(
    getSavedToggle(USAGE_TIP_TOGGLE, true)
  )

  function close () {
    setIsOpened(saveToggle(USAGE_TIP_TOGGLE, false))
  }

  return (
    isOpened && (
      <div className={styles.wrapper}>
        <Icon type='close-small' className={styles.close} onClick={close} />
        <div className={styles.tip}>
          <span className={styles.action}>Click </span>
          on the chart to select the date
        </div>
        <div>
          <span className={styles.action}>Click and move mouse </span>
          on the chart to select the range
        </div>
      </div>
    )
  )
}
