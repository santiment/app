import React, { useState, useEffect } from 'react'
import ExplanationTooltip from '../../components/ExplanationTooltip/ExplanationTooltip'
import styles from './SidecarExplanationTooltip.module.scss'

const LS_SIDECAR_TOOLTIP_SHOWN = 'LS_SIDECAR_TOOLTIP_SHOWN'
const TOOLTIP_DELAY_IN_MS = 5000

const SidecarExplanationTooltip = props => {
  const wasShown = localStorage.getItem(LS_SIDECAR_TOOLTIP_SHOWN)

  const [shown, setShown] = useState()
  const [timer, setTimer] = useState()

  function hideTooltip () {
    localStorage.setItem(LS_SIDECAR_TOOLTIP_SHOWN, '+')
    setShown(false) // HACK(vanguard): To immediatly hide tooltip and then back to not controlled state
    setTimeout(() => setShown(undefined))
  }

  function disableHelp () {
    localStorage.setItem(LS_SIDECAR_TOOLTIP_SHOWN, '+')
    clearTimeout(timer)
  }

  useEffect(() => {
    if (!wasShown) {
      setTimer(setTimeout(() => setShown(true), TOOLTIP_DELAY_IN_MS))
    }

    return () => clearTimeout(timer)
  }, [])

  return (
    <ExplanationTooltip
      {...props}
      className={styles.wrapper}
      shown={shown}
      position='left'
      align='start'
      as='div'
      onOpen={shown ? undefined : disableHelp}
      text={
        <>
          Explore assets
          <div className={styles.text}>
            Quick navigation through your assets
          </div>
          {shown && (
            <button className={styles.btn} onClick={hideTooltip}>
              Dismiss
            </button>
          )}
        </>
      }
    />
  )
}

export default SidecarExplanationTooltip
