import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import Modal from '@santiment-network/ui/Modal'
import styles from './MobileFullscreenChart.module.scss'

const MobileFullscreenChart = ({ isOpen, onToggleFullscreen }) => (
  <Modal
    trigger={
      <Icon
        type='fullscreen-arrows'
        className={styles.icon}
        onClick={() => onToggleFullscreen(true)}
      />
    }
    as={Panel}
    open={isOpen}
  >
    {closeModal => (
      <Button
        onClick={() => {
          onToggleFullscreen(false)
          closeModal()
        }}
      >
        <Icon type='close' />
      </Button>
    )}
  </Modal>
)

export default MobileFullscreenChart
