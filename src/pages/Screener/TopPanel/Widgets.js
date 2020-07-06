import React from 'react'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import styles from './Widgets.module.scss'

const Widgets = ({ isAuthor, id, name, shareLink }) => {
  return (
    <ContextMenu
      trigger={
        <Button variant='flat' className={styles.triggerButton}>
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'>
            <path
              fill-rule='evenodd'
              d='M1 1h4.86v4.86H1V1zM0 1a1 1 0 011-1h4.86a1 1 0 011 1v4.86a1 1 0 01-1 1H1a1 1 0 01-1-1V1zm10.14 0H15v4.86h-4.86V1zm-1 0a1 1 0 011-1H15a1 1 0 011 1v4.86a1 1 0 01-1 1h-4.86a1 1 0 01-1-1V1zM15 10.14h-4.86V15H15v-4.86zm-4.86-1a1 1 0 00-1 1V15a1 1 0 001 1H15a1 1 0 001-1v-4.86a1 1 0 00-1-1h-4.86zm-9.14 1h4.86V15H1v-4.86zm-1 0a1 1 0 011-1h4.86a1 1 0 011 1V15a1 1 0 01-1 1H1a1 1 0 01-1-1v-4.86z'
              clip-rule='evenodd'
            />
          </svg>
        </Button>
      }
      passOpenStateAs='isActive'
      position='bottom'
      align='end'
    >
      <Panel variant='modal' className={styles.wrapper}>
        Nothing here yet!
      </Panel>
    </ContextMenu>
  )
}

export default Widgets
