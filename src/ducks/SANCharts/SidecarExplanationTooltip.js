import React, { useState } from 'react'
import ExplanationTooltip from '../../components/ExplanationTooltip/ExplanationTooltip'
import styles from './SidecarExplanationTooltip.module.scss'

const SidecarExplanationTooltip = props => {
  const [shown, setShown] = useState(true)

  function hideTooltip () {
    setShown(false)
  }

  return (
    <ExplanationTooltip
      {...props}
      className={styles.wrapper}
      shown={shown}
      position='left'
      align='start'
      text={
        <>
          Explore assets
          <div className={styles.text}>
            Quick navigation through your assets
          </div>
          <button className={styles.btn} onClick={hideTooltip}>
            Dismiss
          </button>
        </>
      }
    />
  )
}

export default SidecarExplanationTooltip
