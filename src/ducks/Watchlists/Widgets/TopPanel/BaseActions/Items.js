import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import NewAction from '../../../Actions/New'
import SaveAsAction from '../../../Actions/SaveAs'
import DeleteAction from '../../../Actions/Delete'
import CopyAction from '../../../Actions/Copy'
import EditForm from '../../../Actions/Edit/EditForm'
import styles from './Items.module.scss'

export const Item = ({ className, children, icon, variant = 'ghost', ...props }) => (
  <Button {...props} fluid variant={variant} className={cx(styles.btn, className)}>
    {icon && <Icon type={icon} className={styles.icon} />}
    {children}
  </Button>
)

export const NonAuthorTrigger = (props) => (
  <Item {...props} icon='disk' border className={styles.saveAsNonAuthor}>
    Save as
  </Item>
)

export const Trigger = ({ type, forwardedRef, isActive, onPrimaryAction, openMenu }) => {
  const onSubmit = (props) => onPrimaryAction(props)

  return (
    <div className={styles.trigger} ref={forwardedRef}>
      <NewAction
        type={type}
        onSubmit={onSubmit}
        trigger={<Button className={styles.trigger__text}>New</Button>}
      />
      <div
        className={cx(styles.trigger__arrowBtn, isActive && styles.trigger__arrowBtn_active)}
        onClick={openMenu}
      >
        <Icon
          type='arrow-down'
          className={cx(styles.trigger__arrow, isActive && styles.trigger__arrow_active)}
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
      <Item icon='remove' className={styles.delete}>
        Delete
      </Item>
    }
  />
)

export const New = ({ type, onSubmit }) => (
  <NewAction type={type} onSubmit={onSubmit} trigger={<Item icon='plus-round'>New</Item>} />
)

export const SaveAs = ({ type, watchlist }) => {
  const showDuplicate = ['SCREENER', 'PROJECT', 'BLOCKCHAIN_ADDRESS'].includes(type)
  const iconName = showDuplicate ? 'duplicate' : 'disk'
  return (
    <SaveAsAction
      type={type}
      watchlist={watchlist}
      trigger={
        <Item icon={iconName} className={iconName}>
          {showDuplicate ? 'Duplicate' : 'Save as'}
        </Item>
      }
    />
  )
}

export const Edit = ({ type, title, watchlist, onSubmit, isLoading, trigger }) => {
  const [opened, setOpened] = useState(false)
  const { name, description, isPublic } = watchlist

  return (
    <EditForm
      type={type}
      open={opened}
      id={watchlist.id}
      watchlist={watchlist}
      isLoading={isLoading}
      toggleOpen={setOpened}
      title={'Edit ' + title}
      trigger={trigger || <Item icon='edit'>Edit</Item>}
      settings={{ name, description, isPublic }}
      onFormSubmit={(payload) => onSubmit(payload).then(() => setOpened(false))}
    />
  )
}

export const Copy = ({ watchlist }) => {
  return (
    <CopyAction
      id={watchlist.id}
      assets={watchlist.listItems.map((l) => l.project)}
      trigger={<Item icon='copy'>Copy assets</Item>}
    />
  )
}
