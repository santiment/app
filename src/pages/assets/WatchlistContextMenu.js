import React from 'react'
import { Panel, Button, Icon, ContextMenu, Toggle } from '@santiment-network/ui'
import { CSVLink } from 'react-csv'
import WatchlistCopy from '../../components/WatchlistCopy/WatchlistCopy'
import WatchlistDeleteDialog from './WatchlistDeleteDialog'
import { getTableTitle, normalizeCSV, isNotSafari } from './utils'
import styles from './WatchlistContextMenu.module.scss'

const WatchlistContextMenu = props => {
  const { assets, id } = props
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
      <Panel variant='modal'>
        <div className={styles.block}>
          <Button variant='ghost' fluid className={styles.btn}>
            Secret <Toggle />
          </Button>
        </div>
        <div className={styles.block}>
          <WatchlistCopy
            trigger={
              <Button variant='ghost' fluid>
                Copy
              </Button>
            }
          />
          {isNotSafari && assets && assets.length > 0 && (
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

          <WatchlistDeleteDialog
            id={id}
            trigger={
              <Button variant='ghost' fluid>
                Delete
              </Button>
            }
          />
        </div>
      </Panel>
    </ContextMenu>
  )
}

export default WatchlistContextMenu
