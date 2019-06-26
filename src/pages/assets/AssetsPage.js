import React, { useState } from 'react'
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
import { RANGES } from '../../components/ListInfoWidget/list-info-constants'
import GetAssets from './GetAssets'
import AssetsTable from './AssetsTable'
import HelpPopupAssets from './HelpPopupAssets'
import ShareModalTrigger from '../../components/Share/ShareModalTrigger'
import GetMarketcap from '../../components/ListInfoWidget/GetListInfo'
import WatchlistEditTrigger from '../../components/WatchlistEdit/WatchlistEditTrigger'
import WatchlistContextMenu from './WatchlistContextMenu'
import EmptySection from '../../components/EmptySection/EmptySection'
import WatchlistEdit from '../../components/WatchlistEdit/WatchlistEdit'

import styles from '../../components/Watchlists/Watchlist.module.scss'
import './Assets.css'

const AssetsPage = props => {
  const [pointer, setPointer] = useState(1)
  const [range, setRange] = useState(RANGES[pointer])
  const { name } = qs.parse(props.location.search)
  const isList = props.type === 'list'
  const { title, description } = getHelmetTags(isList, name)

  const changeRange = () => {
    const newPointer = pointer === RANGES.length - 1 ? 0 : pointer + 1
    setPointer(newPointer)
    setRange(RANGES[newPointer])
  }

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
                <h1 className={styles.heading}>{getTableTitle(props)}</h1>
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
                <GetMarketcap
                  type={props.type}
                  range={range}
                  changeRange={changeRange}
                  assetsAmount={Assets.items.length}
                  top3={Assets.items.slice(0, 3)}
                />
                <AssetsTable
                  Assets={Assets}
                  goto={props.history.push}
                  preload={props.preload}
                  listName={getTableTitle(props)}
                />
              </>
            )}
            {!Assets.isLoading &&
              Assets.items.length === 0 &&
              Assets.isCurrentUserTheAuthor && (
              <div className={styles.emptyWrapper}>
                <EmptySection imgClassName={styles.img}>
                  <Label accent='mirage' className={styles.emptyText}>
                      Start to add assets you want to track or just interested
                      in
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
