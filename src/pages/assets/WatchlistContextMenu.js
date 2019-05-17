import React from 'react'
import { Panel, Button, Icon, ContextMenu } from '@santiment-network/ui'
import { CSVLink } from 'react-csv'
import WatchlistPublicityToggle from '../../components/WatchlistShare/WatchlistShare'
import WatchlistCopy from '../../components/WatchlistCopy/WatchlistCopy'
import WatchlistDeleteDialog from './WatchlistDeleteDialog'
import { getTableTitle, normalizeCSV, isNotSafari } from './utils'
import styles from './WatchlistContextMenu.module.scss'

const WatchlistContextMenu = props => {
  const { isAuthor, assets, id } = props
  const hasCSV = isNotSafari && assets && assets.length > 0
  if (!(isAuthor || hasCSV)) {
    return null
  }

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
            <WatchlistPublicityToggle />
          </div>
        )}
        <div className={styles.block}>
          <WatchlistCopy
            trigger={
              <Button variant='ghost' fluid>
                Copy
              </Button>
            }
          />
          {hasCSV && (
            <CSVLink
              data={normalizeCSV(assets)}
              filename={`${getTableTitle(props)}.csv`}
              target='_blank'
            >
              <Button variant='ghost' fluid>
                Download .csv
              </Button>
            </CSVLink>
          )}
          {isAuthor && (
            <WatchlistDeleteDialog
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
