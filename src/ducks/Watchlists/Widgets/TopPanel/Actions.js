import React from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Panel from '@santiment-network/ui/Panel/Panel'
import UIButton from '@santiment-network/ui/Button'
import UIIcon from '@santiment-network/ui/Icon'
import Delete from '../../Actions/Delete'
import Copy from '../../Actions/Copy'
import DownloadCSV from '../../Actions/DownloadCSV'
import { ProLabel } from '../../../../components/ProLabel'
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

const Actions = ({ isAuthor, id, name, assets, isPro }) => {
  if (!id) {
    return null
  }

  const [screeners = []] = useUserScreeners()

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
        <DownloadCSV
          name={name}
          fluid
          variant='ghost'
          disabled={!isPro}
          items={assets}
          className={styles.btn}
        >
          <Icon type='save' />
          Download .csv
          {!isPro && <ProLabel className={styles.proLabel} />}
        </DownloadCSV>
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
