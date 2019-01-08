import React from 'react'
import { Helmet } from 'react-helmet'
import qs from 'query-string'
import { getOrigin } from '../../utils/utils'
import Assets from './Assets'
import AssetsTable from './AssetsTable'
import HelpPopupAssets from './HelpPopupAssets'
import AssetsPageNavigation from './AssetsPageNavigation'
import WatchlistShare from '../../components/WatchlistShare/WatchlistShare'
import WatchlistCopy from '../../components/WatchlistCopy/WatchlistCopy'
import GetTotalMarketcap from '../../components/TotalMarketcapWidget/GetTotalMarketcap'
import StablecoinsDataDownloadBtn from '../../components/StablecoinsDataDownloadBtn/StablecoinsDataDownloadBtn'
import './Assets.css'

const getTableTitle = ({ type, location: { search } }) => {
  switch (type) {
    case 'all':
      return 'All Assets'
    case 'currencies':
      return 'Currencies'
    case 'erc20':
      return 'ERC20 Assets'
    case 'list':
      return (qs.parse(search).name || '').split('@')[0].toUpperCase()
    default:
      return 'Assets'
  }
}

const AssetsPage = props => (
  <div className='page projects-table'>
    <Helmet>
      <title>Assets</title>
      <link rel='canonical' href={`${getOrigin()}/assets`} />
    </Helmet>
    {props.isBetaModeEnabled && (
      <GetTotalMarketcap type={props.type} listName={getTableTitle(props)} />
    )}
    <div className='page-head page-head-projects'>
      <div className='page-head-projects__left'>
        <h1>{getTableTitle(props)}</h1>
        <HelpPopupAssets />
        {props.type === 'list' &&
          props.location.hash !== '#shared' && <WatchlistShare />}

        {props.type === 'list' && <WatchlistCopy />}

        {qs.parse(props.location.search).name === 'stablecoins@86' && (
          <StablecoinsDataDownloadBtn />
        )}
      </div>
      <AssetsPageNavigation
        isLoggedIn={props.isLoggedIn}
        location={props.location}
      />
    </div>
    <Assets
      {...props}
      type={props.type}
      render={Assets => (
        <AssetsTable
          Assets={Assets}
          goto={props.history.push}
          preload={props.preload}
        />
      )}
    />
  </div>
)

export default AssetsPage
