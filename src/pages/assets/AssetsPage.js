import React from 'react'
import { Helmet } from 'react-helmet'
import qs from 'query-string'
import { CSVLink } from 'react-csv'
import { Button, Label } from '@santiment-network/ui'
import { getOrigin } from '../../utils/utils'
import {
  getHelmetTags,
  getTableTitle,
  isNotSafari,
  normalizeCSV
} from './utils'
import GetAssets from './GetAssets'
import AssetsTable from './AssetsTable'
import HelpPopupAssets from './HelpPopupAssets'
import ShareModalTrigger from '../../components/Share/ShareModalTrigger'
import WidgetSonar from '../../components/Widget/WidgetSonar'
import StablecoinsDownloadBtn from './StablecoinsDownloadBtn'
import WatchlistEditTrigger from '../../components/WatchlistEdit/WatchlistEditTrigger'
import WatchlistContextMenu from './WatchlistContextMenu'
import EmptySection from '../../components/EmptySection/EmptySection'
import WatchlistEdit from '../../components/WatchlistEdit/WatchlistEdit'

import styles from '../../components/Watchlists/Watchlist.module.scss'
import './Assets.css'

const AssetsPage = props => {
  const { name } = qs.parse(props.location.search)
  const isList = props.type === 'list'
  const { title, description } = getHelmetTags(isList, name)

  return (
    <div className='page projects-table'>
      <Helmet>
        <link rel='canonical' href={`${getOrigin()}/assets`} />
        <title>{title}</title>
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
      </Helmet>
      <GetAssets
        {...props}
        type={props.type}
        render={Assets => (
          <>
            <div className='page-head page-head-projects'>
              <div className='page-head-projects__left'>
                <h1>{getTableTitle(props)}</h1>
                <HelpPopupAssets />
              </div>
              <div className='page-head-projects__right'>
                {isList && props.location.hash !== '#shared' && (
                  <>
                    <ShareModalTrigger
                      shareLink={window.location.href + '#shared'}
                    />
                    {Assets.isCurrentUserTheAuthor && (
                      <WatchlistEditTrigger
                        name={getTableTitle(props)}
                        id={Assets.typeInfo.listId}
                        assets={Assets.items}
                      />
                    )}
                  </>
                )}

                {!isList &&
                  isNotSafari &&
                  Assets.items &&
                  Assets.items.length > 0 && (
                  <CSVLink
                    data={normalizeCSV(Assets.items)}
                    filename={`${getTableTitle(props)}.csv`}
                    target='_blank'
                  >
                    <Button variant='flat' isActive>
                        Download CSV
                    </Button>
                  </CSVLink>
                )}

                {qs.parse(props.location.search).name === 'stablecoins@86' && (
                  <StablecoinsDownloadBtn />
                )}

                {isList && (
                  <WatchlistContextMenu
                    isAuthor={Assets.isCurrentUserTheAuthor}
                    id={Assets.typeInfo.listId}
                    assets={Assets.items}
                    type={props.type}
                    location={props.location}
                  />
                )}
              </div>
            </div>
            {Assets.items.length > 0 && (
              <>
                <WidgetSonar
                  className='assets-table-widget-wrapper'
                  type={props.type}
                  listName={getTableTitle(props)}
                />
                <AssetsTable
                  Assets={Assets}
                  goto={props.history.push}
                  preload={props.preload}
                />
              </>
            )}
            {Assets.items.length === 0 && Assets.isCurrentUserTheAuthor && (
              <div className={styles.emptyWrapper}>
                <EmptySection imgClassName={styles.img}>
                  <Label accent='mirage' className={styles.emptyText}>
                    Start to add assets you want to track or just interested in
                  </Label>
                  <WatchlistEdit
                    name={getTableTitle(props)}
                    id={Assets.typeInfo.listId}
                    assets={Assets.items}
                    trigger={
                      <Button
                        accent='positive'
                        variant='fill'
                        className={styles.emptyBtn}
                      >
                        Add assets
                      </Button>
                    }
                  />
                </EmptySection>
              </div>
            )}
          </>
        )}
      />
    </div>
  )
}

export default AssetsPage
