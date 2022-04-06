import React from 'react'
import cx from 'classnames'
import StepsContent from './StepsContent/StepsContent'
import styles from './AlertModalContent.module.scss'

const AlertModalContent = ({ selectorSettings }) => {
  const { shouldHideRestrictionMessage } = selectorSettings

  return (
    <div className={cx(styles.wrapper, !shouldHideRestrictionMessage && styles.wrapperResized)}>
      <StepsContent selectorSettings={selectorSettings} />
    </div>
  )
}

export default AlertModalContent
