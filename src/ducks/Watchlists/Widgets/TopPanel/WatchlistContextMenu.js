import React from 'react'
import { CSVLink } from 'react-csv'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import { normalizeCSV } from '../../utils'
import Delete from '../../Actions/Delete'
import Edit from '../../Actions/Edit'
import WeeklyReport from '../../Actions/WeeklyReport'
import Copy from '../../Actions/Copy'
import VisibilityToggle from '../../Actions/ChangeVisibility'
import styles from './WatchlistContextMenu.module.scss'

const WatchlistContextMenu = ({
  isAuthor,
  assets,
  id,
  hasCSV,
  isDesktop,
  name,
  isMonitored
}) => {
  if (!(isAuthor || hasCSV)) return null

  return (
    <ContextMenu
      trigger={
        <Button variant='flat'>
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
            <VisibilityToggle />
          </div>
        )}
        <div className={styles.block}>
          {!isDesktop && isAuthor && (
            <Edit
              id={id}
              assets={assets}
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
          {hasCSV && isDesktop && (
            <CSVLink
              data={normalizeCSV(assets)}
              filename={`${name}.csv`}
              target='_blank'
            >
              <Button variant='ghost' fluid>
                Download .csv
              </Button>
            </CSVLink>
          )}
          {isAuthor && (
            <Delete
              id={id}
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
