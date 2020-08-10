import React, { useState } from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Panel from '@santiment-network/ui/Panel/Panel'
import UIButton from '@santiment-network/ui/Button'
import UIIcon from '@santiment-network/ui/Icon'
import Delete from '../../Actions/Delete'
import EditForm from '../../Actions/Edit/EditForm'
import { ProLabel } from '../../../../components/ProLabel'
import { useUserScreeners, useUpdateWatchlist } from '../../gql/hooks'
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
  isMenuOpened,
  onPrimaryAction,
  openMenu
}) => (
  <div className={styles.trigger} ref={forwardedRef}>
    <EditForm
      title='Edit screener'
      onFormSubmit={onPrimaryAction}
      settings={{
        name,
        description: watchlist.description,
        isPublic: watchlist.isPublic
      }}
      trigger={<UIButton className={styles.trigger__text}>Edit</UIButton>}
    />
    <UIIcon
      type='arrow-down'
      className={cx(
        styles.trigger__arrow,
        isMenuOpened && styles.trigger__arrow_active
      )}
      onClick={openMenu}
    />
  </div>
)

const BaseActions = ({ isAuthor, id, name, assets, watchlist, isPro }) => {
  if (!id) {
    return null
  }

  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [screeners = []] = useUserScreeners()
  const [updateWatchlist] = useUpdateWatchlist()

  return (
    <>
      <ContextMenu
        trigger={
          <Trigger
            watchlist={watchlist}
            name={name}
            openMenu={() => setIsMenuOpened(true)}
            isMenuOpened={isMenuOpened}
            onPrimaryAction={payload =>
              updateWatchlist(watchlist, { ...payload })
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
            onFormSubmit={payload => updateWatchlist(watchlist, { ...payload })}
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
          <EditForm
            title='Save as ...'
            onFormSubmit={payload => console.log(payload)}
            settings={{ name, description: watchlist.description }}
            trigger={
              <Button disabled={!isPro}>
                <Icon type='disk' />
                Save as
                {!isPro && <ProLabel className={styles.proLabel} />}
              </Button>
            }
          />
          <div className={styles.divider} />
          <EditForm
            title='New screener'
            buttonLabel='Create'
            onFormSubmit={payload => console.log(payload)}
            watchlist={watchlist}
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
