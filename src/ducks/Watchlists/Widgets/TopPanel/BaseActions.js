import React, { useState } from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Panel from '@santiment-network/ui/Panel/Panel'
import UIButton from '@santiment-network/ui/Button'
import UIIcon from '@santiment-network/ui/Icon'
import Delete from '../../Actions/Delete'
import EditForm from '../../Actions/Edit/EditForm'
import SaveAs from '../../Actions/SaveAs'
import New from '../../Actions/New/NewScreener'
import { ProLabel } from '../../../../components/ProLabel'
import { useUserScreeners, useUpdateWatchlist } from '../../gql/hooks'
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
  forwardedRef,
  isActive,
  onPrimaryAction,
  isLoading,
  openMenu
}) => {
  const [isEditPopupOpened, setIsEditPopupOpened] = useState(false)

  return (
    <div className={styles.trigger} ref={forwardedRef}>
      <EditForm
        title='Edit screener'
        onFormSubmit={payload =>
          onPrimaryAction(payload).then(() => setIsEditPopupOpened(false))
        }
        isLoading={isLoading}
        open={isEditPopupOpened}
        toggleOpen={setIsEditPopupOpened}
        settings={{
          name,
          description: watchlist.description,
          isPublic: watchlist.isPublic
        }}
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

const BaseActions = ({ isAuthor, id, name, assets, watchlist, isPro }) => {
  if (!id) {
    return null
  }

  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [isEditPopupOpened, setIsEditPopupOpened] = useState(false)
  const [screeners = []] = useUserScreeners()
  const [updateWatchlist, { loading }] = useUpdateWatchlist()

  return (
    <>
      <ContextMenu
        trigger={
          <Trigger
            watchlist={watchlist}
            name={name}
            openMenu={() => setIsMenuOpened(true)}
            isLoading={loading}
            onPrimaryAction={payload =>
              updateWatchlist(watchlist, { ...payload }).then(notifyUpdate)
            }
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
            title='Edit screener'
            isLoading={loading}
            open={isEditPopupOpened}
            toggleOpen={setIsEditPopupOpened}
            onFormSubmit={payload =>
              updateWatchlist(watchlist, { ...payload })
                .then(() => setIsEditPopupOpened(false))
                .then(() => setIsMenuOpened(false))
                .then(notifyUpdate)
            }
            settings={{
              name,
              description: watchlist.description,
              isPublic: watchlist.isPublic
            }}
            trigger={
              <Button>
                <Icon type='edit' />
                Edit
              </Button>
            }
          />
          <SaveAs
            onSubmit={() => setIsMenuOpened(false)}
            watchlist={watchlist}
            trigger={
              <Button disabled={!isPro}>
                <Icon type='disk' />
                Save as
                {!isPro && <ProLabel className={styles.proLabel} />}
              </Button>
            }
          />
          <New
            onSubmit={() => setIsMenuOpened(false)}
            trigger={
              <Button disabled={!isPro}>
                <Icon type='plus-round' />
                New
                {!isPro && <ProLabel className={styles.proLabel} />}
              </Button>
            }
          />
          {isAuthor && screeners.length > 1 && (
            <Delete
              title='Do you want to delete this screener?'
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
    </>
  )
}

export default BaseActions
