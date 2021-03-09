import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import NewAction from '../../../Actions/New'
import DeleteAction from '../../../Actions/Delete'
import EditForm from '../../../Actions/Edit/EditForm'
import styles from './Items.module.scss'

export const Item = ({
  className,
  children,
  icon,
  variant = 'ghost',
  ...props
}) => (
  <Button
    {...props}
    fluid
    variant={variant}
    className={cx(styles.btn, className)}
  >
    {icon && <Icon type={icon} className={styles.icon} />}
    {children}
  </Button>
)

export const NonAuthorTrigger = props => (
  <Item {...props} icon='disk' border className={styles.saveAsNonAuthor}>
    Save as
  </Item>
)

export const Trigger = ({
  type,
  title,
  watchlist,
  forwardedRef,
  isActive,
  onPrimaryAction,
  isLoading,
  openMenu
}) => {
  const { name, description, isPublic } = watchlist
  const [opened, setOpened] = useState(false)

  function onSubmit (props) {
    onPrimaryAction(props).then(() => setOpened(false))
  }

  return (
    <div className={styles.trigger} ref={forwardedRef}>
      <EditForm
        type={type}
        open={opened}
        id={watchlist.id}
        isLoading={isLoading}
        toggleOpen={setOpened}
        title={'Edit ' + title}
        onFormSubmit={onSubmit}
        settings={{ name, description, isPublic }}
        trigger={<Button className={styles.trigger__text}>Edit</Button>}
      />
      <div
        className={cx(
          styles.trigger__arrowBtn,
          isActive && styles.trigger__arrowBtn_active
        )}
        onClick={openMenu}
      >
        <Icon
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

export const Delete = ({ id, name, title }) => (
  <DeleteAction
    title={`Do you want to delete this ${title}?`}
    id={id}
    name={name}
    trigger={
      <Item icon='remove' accent='negative' className={styles.delete}>
        Delete
      </Item>
    }
  />
)

export const New = ({ type, onSubmit }) => (
  <NewAction
    type={type}
    onSubmit={onSubmit}
    trigger={<Item icon='plus-round'>New</Item>}
  />
)
