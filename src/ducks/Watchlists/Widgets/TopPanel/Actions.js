import React from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Panel from '@santiment-network/ui/Panel/Panel'
import UIButton from '@santiment-network/ui/Button'
import UIIcon from '@santiment-network/ui/Icon'
import Delete from '../../Actions/Delete'
import Copy from '../../Actions/Copy'
import { useUserScreeners } from '../../gql/hooks'
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

const Actions = ({ isAuthor, id, name }) => {
  if (!id) {
    return null
  }

  const [screeners = [], loading] = useUserScreeners()

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
        <Copy
          id={id}
          trigger={
            <Button>
              <Icon type='copy' />
              Copy assets to watchlist
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
  )
}

export default Actions
