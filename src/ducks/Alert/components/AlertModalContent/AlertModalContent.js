import React from 'react'
import StepsContent from './StepsContent/StepsContent'
import styles from './AlertModalContent.module.scss'

const AlertModalContent = ({ selectorSettings }) => {
  return (
    <div className={styles.wrapper}>
      <StepsContent selectorSettings={selectorSettings} />
    </div>
  )
}

export default AlertModalContent
