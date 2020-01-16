import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Modal from '@santiment-network/ui/Modal'
import ExplanationTooltip from '../../../ducks/SANCharts/SidecarExplanationTooltip'
import styles from './MobileFullscreenChart.module.scss'

const MobileFullscreenChart = ({ isOpen, onToggleFullscreen }) => {
  const [landscapeMode, setLandscapeMode] = useState(false)

  const setOrientation = () => {
    switch (window.orientation) {
      case -90:
      case 90:
        if (!landscapeMode) {
          setLandscapeMode(true)
        }
        break
      default:
        if (landscapeMode) {
          setLandscapeMode(false)
        }
        break
    }
  }

  useEffect(() => {
    window.addEventListener('orientationchange', setOrientation)
    return () => {
      window.removeEventListener('orientationchange', setOrientation)
    }
  })

  const toggleFullScreen = isOpen => {
    if (document.body.requestFullscreen) {
      if (isOpen) {
        document.body.requestFullscreen()
        window.screen.orientation
          .lock('landscape-primary')
          .then(() => setLandscapeMode(true))
          .catch(setOrientation)
      } else {
        if (landscapeMode) {
          window.screen.orientation.unlock()
        }
        window.document.exitFullscreen()
      }
    } else {
      setOrientation()
    }
  }

  return (
    <ExplanationTooltip
      className={styles.tooltip}
      localStorageSuffix='MOBILE_FULLSCREEN_CHART'
      align='end'
      position='top'
      dismissOnTouch
      title='Open this chart in fullscreen mode to analyze it in more details'
      description=''
      delay={5000}
    >
      <Modal
        trigger={
          <Icon
            type='fullscreen-arrows'
            className={styles.icon}
            onClick={() => {
              onToggleFullscreen(true)
              toggleFullScreen(true)
            }}
          />
        }
        open={isOpen}
      >
        {closeModal => (
          <section
            className={cx(styles.wrapper, !landscapeMode && styles.dark)}
          >
            <Button
              onClick={() => {
                onToggleFullscreen(false)
                toggleFullScreen(false)
                closeModal()
              }}
              className={cx(
                styles.button,
                !landscapeMode && styles.dark__button
              )}
            >
              <Icon type='close' />
            </Button>
            {!landscapeMode && (
              <span className={styles.message}>
                Please, turn your phone horizontally to see a fullscreen chart
              </span>
            )}
          </section>
        )}
      </Modal>
    </ExplanationTooltip>
  )
}

export default MobileFullscreenChart
