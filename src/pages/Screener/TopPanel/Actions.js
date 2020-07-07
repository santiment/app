import React from 'react'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import WatchlistDeleteDialog from '../../assets/WatchlistDeleteDialog'
import WatchlistCopyPopup from '../../../components/WatchlistCopy/WatchlistCopyPopup'
import ShareModalTrigger from '../../../components/Share/ShareModalTrigger'
import PublicityToggle from './Actions/PublicityToggle'
import styles from './Actions.module.scss'

const Actions = ({ watchlist, isAuthor, shareLink }) => {
  return (
    <ContextMenu
      trigger={
        <Button variant='flat' className={styles.triggerButton}>
          <Icon type='dots-vertical' />
        </Button>
      }
      passOpenStateAs='isActive'
      position='bottom'
      align='end'
    >
      <Panel variant='modal' className={styles.wrapper}>
        {isAuthor && (
          <div className={styles.block}>
            <PublicityToggle watchlist={watchlist} />
          </div>
        )}
        <div className={styles.block}>
          <WatchlistCopyPopup
            id={watchlist.id}
            trigger={
              <Button variant='ghost' fluid>
                Copy assets to watchlist
              </Button>
            }
          />
          {shareLink && (
            <ShareModalTrigger
              shareLink={shareLink}
              trigger={props => (
                <Button {...props} variant='ghost' fluid>
                  Share screener
                </Button>
              )}
            />
          )}
          {isAuthor && (
            <WatchlistDeleteDialog
              title='Do you want to delete this screener?'
              id={watchlist.id}
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
