import React from 'react'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import styles from './BaseActions.module.scss'

const BaseActions = ({ isAuthor, id, name, shareLink }) => {
  return (
    <ContextMenu
      trigger={
        <Button variant='flat' className={styles.triggerButton}>
          <Icon type='screener' />
        </Button>
      }
      passOpenStateAs='isActive'
      position='bottom'
      align='start'
    >
      <Panel variant='modal' className={styles.wrapper}>
        Nothing here yet!
      </Panel>
    </ContextMenu>
  )
}

export default BaseActions
