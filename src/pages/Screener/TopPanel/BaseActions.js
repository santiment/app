import React from 'react'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import styles from './BaseActions.module.scss'

const BaseActions = ({ isAuthor, id, name, shareLink }) => {
  return (
    <ContextMenu
      trigger={
        <Button variant='flat' className={styles.triggerButton}>
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'>
            <path
              fill-rule='evenodd'
              d='M5.86 1H1v4.86h4.86V1zM1 0a1 1 0 00-1 1v4.86a1 1 0 001 1h4.86a1 1 0 001-1V1a1 1 0 00-1-1H1zm14 1h-4.86v4.86H15V1zm-4.86-1a1 1 0 00-1 1v4.86a1 1 0 001 1H15a1 1 0 001-1V1a1 1 0 00-1-1h-4.86zM0 12.5c0-.28.22-.5.5-.5h15a.5.5 0 010 1H.5a.5.5 0 01-.5-.5zM.5 9a.5.5 0 000 1h15a.5.5 0 000-1H.5zM0 15.5c0-.28.22-.5.5-.5h15a.5.5 0 010 1H.5a.5.5 0 01-.5-.5z'
              clip-rule='evenodd'
            />
          </svg>
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
