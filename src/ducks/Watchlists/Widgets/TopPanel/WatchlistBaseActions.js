import React, { useState } from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Panel from '@santiment-network/ui/Panel/Panel'
import UIButton from '@santiment-network/ui/Button'
import UIIcon from '@santiment-network/ui/Icon'
import Delete from '../../Actions/Delete'
import EditForm from '../../Actions/Edit/EditForm'
import EditAssets from '../../Actions/Edit/EditAssets'
import SaveAs from '../../Actions/SaveAs'
import New from '../../Actions/New'
// import EditAssets from '../../ducks/Watchlists/Actions/Edit/Trigger'
import { useUserWatchlists, useUpdateWatchlist } from '../../gql/hooks'
import { notifyUpdate } from './notifications'
import styles from './BaseActions.module.scss'

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

const Trigger = ({
  watchlist,
  name,
  isActive,
  lists,
  assets,
  forwardedRef,
  openMenu
}) => {
  return (
    <div className={styles.trigger} ref={forwardedRef}>
      <EditAssets
        id={watchlist.id}
        assets={assets}
        name={name}
        trigger={<UIButton className={styles.trigger__text}>Edit</UIButton>}
      />
      <div
        className={cx(
          styles.trigger__arrowBtn,
          isActive && styles.trigger__arrowBtn_active
        )}
        onClick={openMenu}
      >
        <UIIcon
          type='arrow-down'
          className={cx(
            styles.trigger__arrow,
            isActive && styles.trigger__arrow_active
          )}
        />
      </div>
    </div>
  )
}

const BaseActions = ({ isAuthor, id, name, assets, watchlist, onClick }) => {
  if (!id) {
    return null
  }

  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [isEditPopupOpened, setIsEditPopupOpened] = useState(false)
  const [watchlists = []] = useUserWatchlists()
  const [updateWatchlist, { loading }] = useUpdateWatchlist()

  return (
    <div onClick={onClick}>
      <ContextMenu
        trigger={
          <Trigger
            lists={watchlists}
            watchlist={watchlist}
            name={name}
            assets={assets}
            openMenu={() => setIsMenuOpened(true)}
          />
        }
        passOpenStateAs='isActive'
        position='bottom'
        align='start'
        open={isMenuOpened}
        onClose={() => setIsMenuOpened(false)}
      >
        <Panel variant='modal' className={styles.wrapper}>
          <EditForm
            lists={watchlists}
            title='Edit watchlist'
            type='watchlist'
            id={watchlist.id}
            isLoading={loading}
            open={isEditPopupOpened}
            toggleOpen={setIsEditPopupOpened}
            onFormSubmit={payload =>
              updateWatchlist(watchlist, { ...payload })
                .then(() => setIsEditPopupOpened(false))
                .then(() => setIsMenuOpened(false))
                .then(() => notifyUpdate(payload.type))
            }
            settings={{
              name,
              description: watchlist.description,
              isPublic: watchlist.isPublic
            }}
            trigger={
              <Button>
                <Icon type='edit' />
                Rename
              </Button>
            }
          />
          <SaveAs
            onSubmit={() => setIsMenuOpened(false)}
            watchlist={watchlist}
            lists={watchlists}
            type='watchlist'
            trigger={
              <Button>
                <Icon type='disk' />
                Save as
              </Button>
            }
          />
          <New
            lists={watchlists}
            type='watchlist'
            onSubmit={() => setIsMenuOpened(false)}
            trigger={
              <Button>
                <Icon type='plus-round' />
                New
              </Button>
            }
          />
          {isAuthor && (
            <Delete
              title='Do you want to delete this watchlist?'
              id={id}
              name={name}
              trigger={
                <Button variant='negative' className={styles.delete}>
                  <Icon type='remove' />
                  Delete
                </Button>
              }
            />
          )}
        </Panel>
      </ContextMenu>
    </div>
  )
}

export default BaseActions
