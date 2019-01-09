import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import qs from 'query-string'
import { CSVLink } from 'react-csv'
import { Button } from '@santiment-network/ui'
import { getOrigin } from '../../utils/utils'
import Assets from './Assets'
import AssetsTable from './AssetsTable'
import HelpPopupAssets from './HelpPopupAssets'
import AssetsPageNavigation from './AssetsPageNavigation'
import WatchlistShare from '../../components/WatchlistShare/WatchlistShare'
import WatchlistCopy from '../../components/WatchlistCopy/WatchlistCopy'
import WidgetList from '../../components/Widget/WidgetList'
import StablecoinsDataDownloadBtn from '../../components/StablecoinsDataDownloadBtn/StablecoinsDataDownloadBtn'
import './Assets.css'

const getHeadTitle = (type, searchParams) => {
  switch (type) {
    case 'all':
      return 'All Assets'
    case 'currencies':
      return 'Currencies'
    case 'erc20':
      return 'ERC20 Assets'
    case 'list':
      return (qs.parse(searchParams).name || '').split('@')[0].toUpperCase()
    default:
      return 'Assets'
  }
}

const normalizeCSV = items => {
  return items.map(item => {
    const {coinmarketcapId, __typename, id, signals, ethAddresses, ...rest } = item
    const _ethAddresses = ethAddresses ? ethAddresses.map(address =>
      `https://app.santiment.net/balance?address=${address.address}&assets[]=ethereum`
    ) : undefined
    if (_ethAddresses && _ethAddresses.length > 0) {
      return {_ethAddresses, ...rest}
    }
    return rest
  })
}

const AssetsPage = props => (
  <div className='page projects-table'>
    <Helmet>
      <title>Assets</title>
      <link rel='canonical' href={`${getOrigin()}/assets`} />
    </Helmet>
    {props.isBetaModeEnabled && (
      <WidgetList
        listName={getHeadTitle(props.type, props.location.search)}
        type={props.type}
        isLoggedIn={props.isLoggedIn}
      />
    )}
    <Assets
      {...props}
      type={props.type}
      render={Assets => (
        <Fragment>
          <div className='page-head page-head-projects'>
            <div className='page-head-projects__left'>
              <h1>{getHeadTitle(props.type, props.location.search)}</h1>
              <HelpPopupAssets />
              {props.type === 'list' &&
              props.location.hash !== '#shared' && <WatchlistShare />}

              {props.type === 'list' && <WatchlistCopy />}

              {Assets.items && Assets.items.length > 0 &&
                  <CSVLink data={normalizeCSV(Assets.items)}
                    filename={`${getHeadTitle(props.type, props.location.search)}.csv`}
                    target="_blank"
                  >
                    <Button variant='flat' isActive>Download CSV</Button>
                  </CSVLink>
              }

              {qs.parse(props.location.search).name === 'stablecoins@86' && (
                <StablecoinsDataDownloadBtn />
              )}
            </div>
            <AssetsPageNavigation
              isLoggedIn={props.isLoggedIn}
              location={props.location}
            />
          </div>
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

export default AssetsPage
