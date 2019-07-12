import React from 'react'
import { CSVLink } from 'react-csv'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import { normalizeCSV } from './utils'
import { isNotSafari } from '../../utils/utils'
import ShareModalTrigger from '../../components/Share/ShareModalTrigger'
import WatchlistEditTrigger from '../../components/WatchlistEdit/WatchlistEditTrigger'
import WatchlistCopyPopup from '../../components/WatchlistCopy/WatchlistCopyPopup'
import WatchlistContextMenu from './WatchlistContextMenu'
import styles from './WatchlistActionButton.module.scss'

const WatchlistActions = ({
  isList,
  listType,
  shareLink,
  isAuthor,
  id,
  title,
  items,
  type,
  location,
  isDesktop,
  isLoggedIn
}) => {
  const isCategory = !isList || listType === '#shared'
  const hasCSV = isNotSafari && items && items.length > 0

  return (
    <>
      {isCategory || !isLoggedIn ? (
        <>
          <WatchlistCopyPopup
            id={id}
            trigger={
              <Button border variant='flat'>
                <Icon type='copy' className={styles.icon} />
                <span className={styles.text}>Copy</span>
              </Button>
            }
          />
          {hasCSV && (
            <CSVLink
              data={normalizeCSV(items)}
              filename={`${title}.csv`}
              target='_blank'
            >
              <Button border variant='flat'>
                <Icon type='save' className={styles.icon} />
                <span className={styles.text}>Download .csv</span>
              </Button>
            </CSVLink>
          )}
        </>
      ) : (
        <>
          <ShareModalTrigger shareLink={shareLink} />
          {isAuthor && (
            <WatchlistEditTrigger name={title} id={id} assets={items} />
          )}
          <WatchlistContextMenu
            isAuthor={isAuthor}
            id={id}
            name={title}
            assets={items}
            type={type}
            location={location}
            hasCSV={hasCSV}
            isDesktop={isDesktop}
          />
        </>
      )}
    </>
  )
}

export default WatchlistActions
