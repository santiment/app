import React from 'react'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import WatchlistDeleteDialog from '../../assets/WatchlistDeleteDialog'
import WatchlistCopyPopup from '../../../components/WatchlistCopy/WatchlistCopyPopup'
import WatchlistPublicityToggle from '../../../components/WatchlistShare/WatchlistShare'
import styles from './index.module.scss'

const Actions = ({ isAuthor, id, name }) => {
  return (
    <ContextMenu
      trigger={
        <Button variant='flat'>
          <Icon type='dots' className={styles.dots} />
        </Button>
      }
      passOpenStateAs='isActive'
      position='bottom'
      align='end'
    >
      <Panel variant='modal' className={styles.wrapper}>
        {isAuthor && (
          <div className={styles.block}>
            <WatchlistPublicityToggle />
          </div>
        )}
        <div className={styles.block}>
          <WatchlistCopyPopup
            id={id}
            trigger={
              <Button variant='ghost' fluid>
                Copy assets to watchlist
              </Button>
            }
          />
          {isAuthor && (
            <WatchlistDeleteDialog
              id={id}
              trigger={
                <Button variant='ghost' fluid>
                  Delete
                </Button>
              }
            />
          )}
        </div>
      </Panel>
    </ContextMenu>
  )
}

export default Actions
