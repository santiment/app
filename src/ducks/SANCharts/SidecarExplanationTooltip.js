import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import ExplanationTooltip from '../../components/ExplanationTooltip/ExplanationTooltip'
import styles from './SidecarExplanationTooltip.module.scss'

const LS_SIDECAR_TOOLTIP_SHOWN = 'LS_SIDECAR_TOOLTIP_SHOWN'
const TOOLTIP_DELAY_IN_MS = 10000

const SidecarExplanationTooltip = props => {
  const [shown, setShown] = useState(false)
  return (
    <ForceClosableExplanationTooltip
      {...props}
      shown={shown}
      setShown={setShown}
    />
  )
}

export const ForceClosableExplanationTooltip = props => {
  const {
    localStorageSuffix = '',
    dismissOnTouch = false,
    delay = TOOLTIP_DELAY_IN_MS,
    showEnabled = true,
    setShown = () => {},
    shown
  } = props

  const localStorageLabel = LS_SIDECAR_TOOLTIP_SHOWN + localStorageSuffix
  const wasShown = localStorage.getItem(localStorageLabel)
  const canShow = !dismissOnTouch && !wasShown && shown

  const [timer, setTimer] = useState()

  function hideTooltip () {
    localStorage.setItem(localStorageLabel, '+')
    setShown(false) // HACK(vanguard): To immediatly hide tooltip and then back to not controlled state
    setTimeout(() => setShown(undefined), 0)
  }

  function disableHelp () {
    localStorage.setItem(localStorageLabel, '+')
    clearTimeout(timer)
  }

  useEffect(() => {
    if (!wasShown && showEnabled) {
      setTimer(setTimeout(() => setShown(true), delay))
    }

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (dismissOnTouch) {
      window.addEventListener('touchstart', hideTooltip)
    }

    return () => window.removeEventListener('touchstart', hideTooltip)
  }, [])

  return (
    <ExplanationTooltipWrapper
      {...props}
      disableHelp={disableHelp}
      hideTooltip={hideTooltip}
      shown={canShow}
      dismissOnTouch={dismissOnTouch}
    />
  )
}

export const ExplanationTooltipWrapper = props => {
  const {
    dismissOnTouch = false,
    shown = true,
    hideTooltip = () => {},
    disableHelp = () => {},
    className,
    position = 'left',
    withArrow = false,
    align = 'start',
    title = 'Explore assets',
    description = 'Quick navigation through your assets'
  } = props

  return (
    <ExplanationTooltip
      {...props}
      className={cx(styles.wrapper, className)}
      shown={shown}
      position={position}
      withArrow={withArrow}
      align={align}
      as='div'
      onOpen={shown ? undefined : disableHelp}
      text={
        <>
          {title}
          {description && <div className={styles.text}>{description}</div>}
          {shown && !dismissOnTouch && (
            <Icon
              type='close-small'
              className={styles.btn}
              onClick={hideTooltip}
            />
          )}
        </>
      }
    />
  )
}

export default SidecarExplanationTooltip
