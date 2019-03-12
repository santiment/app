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

const normalizeCSV = items => {
  return items.map(item => {
    const {
      coinmarketcapId,
      __typename,
      id,
      signals,
      ethAddresses,
      ...rest
    } = item
    const _ethAddresses = ethAddresses
      ? ethAddresses.map(
        address =>
          `https://app.santiment.net/balance?address=${
            address.address
          }&assets[]=ethereum`
      )
      : undefined
    if (_ethAddresses && _ethAddresses.length > 0) {
      return { _ethAddresses, ...rest }
    }
    return rest
  })
}

const isNotSafari = () =>
  !/^((?!chrome|android).)*safari/i.test(window.navigator.userAgent)

const getHelmetTags = (isList, listName) => {
  return {
    title: isList
      ? `Crypto Watchlist: ${listName.split('@')[0]} - SANbase`
      : 'All Crypto Assets - SANbase',
    description: isList
      ? 'Santiment Watchlists let you keep track of different crypto projects, and compare their performance, on-chain behavior and development activity.'
      : 'Financial, on-chain and development data for 1100+ crypto projects in the Santiment database, including BTC, XRP, ETH and 700+ ERC-20 tokens'
  }
}

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
                  <StablecoinsDataDownloadBtn />
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
