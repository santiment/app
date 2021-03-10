import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Copy from '../../Actions/Copy'
import Delete from '../../Actions/Delete'
import Edit from '../../Actions/Edit/EditAssets'
import WeeklyReport from '../../Actions/WeeklyReport'
import VisibilityToggle from '../../Actions/ChangeVisibility'
import { upperCaseFirstLetter } from '../../../../utils/formatting'
import styles from './WatchlistMobileActions.module.scss'

const WatchlistActions = ({ isAuthor, id, title, items, watchlist = {} }) => {
  if (!watchlist) {
    return null
  }

  const name = upperCaseFirstLetter(title)

  return (
    <ContextMenu
      trigger={
        <Button variant='flat' className={styles.trigger}>
          <Icon type='dots' />
        </Button>
      }
      passOpenStateAs='isActive'
      position='bottom'
      align='end'
    >
      <Panel variant='modal' className={styles.wrapper}>
        {isAuthor && (
          <div className={styles.block}>
            <VisibilityToggle watchlist={watchlist} fluid variant='ghost' />
          </div>
        )}
        <div className={styles.block}>
          {isAuthor && (
            <Edit
              id={id}
              assets={items}
              name={name}
              trigger={
                <Button variant='ghost' fluid>
                  Edit assets
                </Button>
              }
            />
          )}
          <Copy
            id={id}
            trigger={
              <Button variant='ghost' fluid>
                Copy assets to ...
              </Button>
            }
          />
          {isAuthor && (
            <WeeklyReport
              watchlist={watchlist}
              trigger={
                <Button variant='ghost' fluid>
                  Weekly report
                </Button>
              }
            />
          )}
          {isAuthor && (
            <Delete
              id={id}
              name={name}
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

export default WatchlistActions
