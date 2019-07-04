import React from 'react'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import Icon from '@santiment-network/ui/Icon'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import styles from './PrePublishPopup.module.scss'

const PrePublishPopup = () => (
  <ContextMenu
    trigger={
      <Button accent='positive' border>
        Publish insight
        <Icon type='arrow-down' className={styles.icon} />
      </Button>
    }
  >
    <Panel padding>lalala</Panel>
  </ContextMenu>
)

export default PrePublishPopup
