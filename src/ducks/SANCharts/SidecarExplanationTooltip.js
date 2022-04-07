import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import ExplanationTooltip from '../../components/ExplanationTooltip/ExplanationTooltip'
import styles from './SidecarExplanationTooltip.module.scss'

const LS_SIDECAR_TOOLTIP_SHOWN = 'LS_SIDECAR_TOOLTIP_SHOWN'
const TOOLTIP_DELAY_IN_MS = 10000

export const markedAsShowed = (localStorageSuffix) => {
  return localStorage.getItem(LS_SIDECAR_TOOLTIP_SHOWN + localStorageSuffix)
}

const SidecarExplanationTooltip = (props) => {
  const [shown, setShown] = useState(false)
  return <ForceClosableExplanationTooltip {...props} shown={shown} setShown={setShown} />
}

export const ForceClosableExplanationTooltip = (props) => {
  const {
    localStorageSuffix = '',
    dismissOnTouch = false,
    delay = TOOLTIP_DELAY_IN_MS,
    showEnabled = true,
    setShown = () => {},
    shown,
    onHide,
    forceClose,
  } = props
  const [forceClosed, setForceClosed] = useState(false)

  const localStorageLabel = LS_SIDECAR_TOOLTIP_SHOWN + localStorageSuffix
  const wasShown = markedAsShowed(localStorageSuffix)
  const canShow = !wasShown && !forceClosed && shown

  const [timer, setTimer] = useState()

  function hideTooltip () {
    localStorage.setItem(localStorageLabel, '+')
    setForceClosed(true) // HACK(vanguard): To immediatly hide tooltip and then back to not controlled state
    setTimeout(() => setShown(undefined), 0)
    onHide && onHide()
  }

  function disableHelp () {
    localStorage.setItem(localStorageLabel, '+')
    clearTimeout(timer)
    onHide && onHide()
  }

  useEffect(() => {
    if (!wasShown && showEnabled) {
      setTimer(setTimeout(() => setShown(true), delay))
    }

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (forceClose) {
      hideTooltip()
    }
  }, [props.forceClose])

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

export const ExplanationTooltipWrapper = (props) => {
  const {
    dismissOnTouch = false,
    shown = true,
    hideTooltip = () => {},
    disableHelp = () => {},
    className,
    position = 'left',
    withArrow = false,
    align = 'start',
    closable = true,
    classes = {},
    closeEl: CloseIcon = CloseTrigger,
    as = 'div',
  } = props

  return (
    <ExplanationTooltip
      {...props}
      className={cx(styles.wrapper, className)}
      shown={shown}
      position={position}
      withArrow={withArrow}
      align={align}
      as={as}
      onOpen={shown ? undefined : disableHelp}
      text={
        <div className={cx(styles.content, classes.tooltipContent)}>
          <Content {...props} />
          {shown && !dismissOnTouch && closable && (
            <CloseIcon onClick={hideTooltip} classes={classes} />
          )}
        </div>
      }
    />
  )
}

const Content = ({
  title = 'Explore assets',
  description = 'Quick navigation through your assets',
  isNew,
  content,
}) => {
  if (content) {
    return content
  }

  return (
    <div>
      <div className={styles.title}>
        {[
          isNew && (
            <span className={styles.new} key='new'>
              New!
            </span>
          ),
          <span key='title'>{title}</span>,
        ]}
      </div>
      {description && <div className={styles.text}>{description}</div>}
    </div>
  )
}

const CloseTrigger = ({ classes = {}, onClick }) => (
  <Icon type='close-small' className={cx(styles.btn, classes.tooltipClose)} onClick={onClick} />
)

export default SidecarExplanationTooltip
