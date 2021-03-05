import React, { useState } from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Panel from '@santiment-network/ui/Panel/Panel'
import UIButton from '@santiment-network/ui/Button'
import UIIcon from '@santiment-network/ui/Icon'
import Delete from '../../Actions/Delete'
import EditForm from '../../Actions/Edit/EditForm'
import SaveAs from '../../Actions/SaveAs'
import New from '../../Actions/New'
import { ProLabel } from '../../../../components/ProLabel'
import ProPopupWrapper from '../../../../components/ProPopup/Wrapper'
import { useUpdateWatchlist } from '../../gql/hooks'
import { notifyUpdate } from './notifications'
import { useUserScreeners } from '../../gql/lists/hooks'
import { SCREENER } from '../../detector'
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
  type = 'screener',
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
        title={'Edit ' + type}
        type={type}
        id={watchlist.id}
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

const BaseActions = ({
  className,
  isAuthor,
  id,
  name,
  watchlist,
  isPro,
  isAuthorLoading,
  onClick,
  type
}) => {
  if (!id) {
    return null
  }
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [isEditPopupOpened, setIsEditPopupOpened] = useState(false)
  const [screeners] = useUserScreeners()
  const [updateWatchlist, { loading }] = useUpdateWatchlist()
  const showDelete = isAuthor && (type !== SCREENER || screeners.length > 1)

  return (
    <div onClick={onClick} className={cx(styles.container, className)}>
      {isAuthor && (
        <ContextMenu
          trigger={
            <Trigger
              watchlist={watchlist}
              name={name}
              openMenu={() => setIsMenuOpened(true)}
              isLoading={loading}
              onPrimaryAction={payload =>
                updateWatchlist(watchlist, { ...payload }).then(() =>
                  notifyUpdate(payload.type)
                )
              }
              type={type}
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
              type={type}
              title={'Edit ' + type}
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
                  Edit
                </Button>
              }
            />
            <ProPopupWrapper
              type={type}
              trigger={props => (
                <Button {...props}>
                  <Icon type='disk' />
                  Save as
                  {!isPro && <ProLabel className={styles.proLabel} />}
                </Button>
              )}
            >
              <SaveAs
                type={type}
                onSubmit={() => setIsMenuOpened(false)}
                watchlist={watchlist}
                trigger={
                  <Button>
                    <Icon type='disk' />
                    Save as
                    {!isPro && <ProLabel className={styles.proLabel} />}
                  </Button>
                }
              />
            </ProPopupWrapper>
            <ProPopupWrapper
              type={type}
              trigger={props => (
                <Button {...props}>
                  <Icon type='plus-round' />
                  New
                  {!isPro && <ProLabel className={styles.proLabel} />}
                </Button>
              )}
            >
              <New
                type={type}
                onSubmit={() => setIsMenuOpened(false)}
                trigger={
                  <Button>
                    <Icon type='plus-round' />
                    New
                    {!isPro && <ProLabel className={styles.proLabel} />}
                  </Button>
                }
              />
            </ProPopupWrapper>
            {showDelete && (
              <Delete
                title={`Do you want to delete this ${type}?`}
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
      )}
      {!isAuthor && !isAuthorLoading && (
        <ProPopupWrapper
          type={type}
          trigger={props => (
            <Button {...props} border className={styles.saveAsNonAuthor}>
              <Icon type='disk' />
              Save as
            </Button>
          )}
        >
          <SaveAs
            type={type}
            watchlist={watchlist}
            trigger={
              <Button border className={styles.saveAsNonAuthor}>
                <Icon type='disk' />
                Save as
              </Button>
            }
          />
        </ProPopupWrapper>
      )}
    </div>
  )
}

export default BaseActions
