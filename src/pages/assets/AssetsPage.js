import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import qs from 'query-string'
import { CSVLink } from 'react-csv'
import { Button } from '@santiment-network/ui'
import { getOrigin } from '../../utils/utils'
import Assets from './Assets'
import AssetsTable from './AssetsTable'
import HelpPopupAssets from './HelpPopupAssets'
import WatchlistShare from '../../components/WatchlistShare/WatchlistShare'
import WatchlistCopy from '../../components/WatchlistCopy/WatchlistCopy'
import WidgetSonar from '../../components/Widget/WidgetSonar'
import StablecoinsDownloadBtn from './StablecoinsDownloadBtn'
import {
  getTableTitle,
  normalizeCSV,
  isNotSafari,
  getHelmetTags
} from './utils'
import './Assets.css'

const AssetsPage = props => {
  const { name } = qs.parse(props.location.search)
  const isList = props.type === 'list'
  const { title, description } = getHelmetTags(isList, name)

  return (
    <div className='page projects-table'>
      <Helmet>
        <link rel='canonical' href={`${getOrigin()}/assets`} />
        <title>{title}</title>,
        <meta property='og:title' content={title} />,
        <meta property='og:description' content={description} />
      </Helmet>
      <Assets
        {...props}
        type={props.type}
        render={Assets => (
          <Fragment>
            <div className='page-head page-head-projects'>
              <div className='page-head-projects__left'>
                <h1>{getTableTitle(props)}</h1>
                <HelpPopupAssets />
              </div>
              <div className='page-head-projects__right'>
                {isList && props.location.hash !== '#shared' && (
                  <WatchlistShare />
                )}

                {isList && <WatchlistCopy />}

                {isNotSafari && Assets.items && Assets.items.length > 0 && (
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
              </div>
            </div>
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
          </Fragment>
        )}
      />
    </div>
  )
}

export default AssetsPage
