import React from 'react'
import { CSVLink } from 'react-csv'
import { graphql } from 'react-apollo'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import { normalizeCSV } from '../../utils'
import { isNotSafari } from '../../../../utils/utils'
import { upperCaseFirstLetter } from '../../../../utils/formatting'
import ShareModalTrigger from '../../../../components/Share/ShareModalTrigger'
import EditTrigger from '../../Actions/Edit/Trigger'
import WeeklyReportTrigger from '../../Actions/WeeklyReport/Trigger'
import Copy from '../../Actions/Copy'
import WatchlistContextMenu from './WatchlistContextMenu'
import { WATCHLIST_QUERY } from '../../../../queries/WatchlistGQL'
import styles from './WatchlistActionButton.module.scss'

const WatchlistActions = ({
  isList,
  listType,
  shareLink,
  isAuthor,
  id,
  title: initialTitle,
  items,
  type,
  location,
  isDesktop,
  isLoggedIn,
  isMonitored,
  watchlist = {}
}) => {
  if (!watchlist) {
    return null
  }

  const { isPublic } = watchlist

  const hasCSV = isNotSafari && items && items.length > 0
  const title = upperCaseFirstLetter(initialTitle)

  return (
    <>
      {(!isList || (listType === '#shared' && !isAuthor) || !isLoggedIn) &&
      isDesktop ? (
        <>
          <Copy
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
          {isLoggedIn && (
            <WatchlistContextMenu
              watchlist={watchlist}
              isAuthor={isAuthor}
              id={id}
              name={title}
              assets={items}
              type={type}
              location={location}
              hasCSV={hasCSV}
              isDesktop={isDesktop}
              isMonitored={isMonitored}
            />
          )}
          {isDesktop && (
            <>
              {isPublic && <ShareModalTrigger shareLink={shareLink} />}
              {isAuthor && (
                <>
                  <EditTrigger name={title} id={id} assets={items} />
                  <WeeklyReportTrigger
                    id={id}
                    name={title}
                    isMonitored={isMonitored}
                  />
                </>
              )}
            </>
          )}
        </>
        )}
    </>
  )
}

const enhance = graphql(WATCHLIST_QUERY, {
  options: ({ id }) => ({
    variables: {
      id: id
    }
  }),
  props: ({ data }) => {
    return {
      watchlist: data.watchlist,
      isLoading: data.loading,
      isError: !!data.error
    }
  }
})

export default enhance(WatchlistActions)
