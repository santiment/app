import React from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Panel from '@santiment-network/ui/Panel/Panel'
import UIButton from '@santiment-network/ui/Button'
import UIIcon from '@santiment-network/ui/Icon'
import WatchlistDeleteDialog from '../../Actions/WatchlistDeleteDialog'
import Copy from '../../Actions/Copy'
import ShareModalTrigger from '../../../../components/Share/ShareModalTrigger'
import VisibilityToggle from '../../Actions/ChangeVisibility'
import styles from './Actions.module.scss'

export const Icon = ({ className, ...props }) => (
  <UIIcon {...props} className={cx(styles.icon, className)} />
)

export const Button = ({ className, ...props }) => (
  <UIButton
    {...props}
    fluid
    variant='ghost'
    className={cx(styles.btn, className)}
  />
)

const Actions = ({ isAuthor, id, name, shareLink }) => {
  return (
    <ContextMenu
      trigger={
        <UIButton variant='flat' className={styles.triggerButton}>
          <UIIcon type='dots-vertical' />
        </UIButton>
      }
      passOpenStateAs='isActive'
      position='bottom'
      align='end'
    >
      <Panel variant='modal' className={styles.wrapper}>
        {isAuthor && (
          <div className={styles.block}>
            <VisibilityToggle />
          </div>
        )}
        <Copy
          id={id}
          trigger={
            <Button>
              <Icon type='copy' />
              Copy assets to watchlist
            </Button>
          }
        />
        {shareLink && (
          <ShareModalTrigger
            shareLink={shareLink}
            trigger={props => (
              <Button {...props}>
                <Icon type='share' />
                Share screener
              </Button>
            )}
          />
        )}
        {isAuthor && (
          <WatchlistDeleteDialog
            title='Do you want to delete this screener?'
            id={id}
            trigger={
              <Button>
                <Icon type='remove' />
                Delete
              </Button>
            }
          />
        )}
      </Panel>
    </ContextMenu>
  )
}

export default Actions
