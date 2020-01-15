import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Modal from '@santiment-network/ui/Modal'
import styles from './MobileFullscreenChart.module.scss'

const MobileFullscreenChart = ({ isOpen, onToggleFullscreen }) => {
  const toggleFullScreen = isOpen => {
    if (document.body.requestFullscreen) {
      isOpen ? document.body.requestFullscreen() : document.exitFullscreen()
    }
  }

  return (
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
        <section className={styles.wrapper}>
          <Button
            onClick={() => {
              onToggleFullscreen(false)
              toggleFullScreen(false)
              closeModal()
            }}
          >
            <Icon type='close' />
          </Button>
        </section>
      )}
    </Modal>
  )
}

export default MobileFullscreenChart
