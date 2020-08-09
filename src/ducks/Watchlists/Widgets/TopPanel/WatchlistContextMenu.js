import React from 'react'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import Copy from '../../Actions/Copy'
import Delete from '../../Actions/Delete'
import Edit from '../../Actions/Edit/EditAssets'
import DownloadCSV from '../../Actions/DownloadCSV'
import WeeklyReport from '../../Actions/WeeklyReport'
import VisibilityToggle from '../../Actions/ChangeVisibility'
import styles from './WatchlistContextMenu.module.scss'

const WatchlistContextMenu = ({
  isAuthor,
  items,
  id,
  isDesktop,
  name,
  isMonitored,
  watchlist
}) => {
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
          {!isDesktop && isAuthor && (
            <Edit
              id={id}
              assets={items}
              name={name}
              trigger={
                <Button variant='ghost' fluid>
                  Edit
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
          {!isDesktop && isAuthor && (
            <WeeklyReport
              id={id}
              isMonitored={isMonitored}
              name={name}
              trigger={
                <Button variant='ghost' fluid>
                  Weekly report
                </Button>
              }
            />
          )}
          {isDesktop && (
            <DownloadCSV
              name={name}
              trigger={
                <Button variant='ghost' fluid>
                  Download .csv
                </Button>
              }
              items={items}
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

export default WatchlistContextMenu
