import React from 'react'
import WatchlistCards from '../../../components/Watchlists/WatchlistCards'
import { CATEGORIES } from '../../assets/assets-overview-constants'
import MyWatchlist from '../../../components/Watchlists/MyWatchlist'
import IndexTab from '../IndexTabs/IndexTab'
import externalStyles from '../MarketingPage.module.scss'

export default () => {
  return (
    <IndexTab
      tabs={[
        {
          type: 'Indices',
          content: (
            <WatchlistCards
              watchlists={CATEGORIES}
              classes={externalStyles}
              showNew={true}
            />
          )
        },
        {
          type: 'Your watchlists',
          content: <MyWatchlist showHeader={false} showNew={true} />
        }
      ]}
    />
  )
}
