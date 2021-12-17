import React from 'react'
import { Helmet } from 'react-helmet'
import { withRenderQueueProvider } from '../../ducks/renderQueue/viewport'
import DashboardLayout from '../../ducks/Dashboards/DashboardLayout'

const NftInfluencersPage = () => {
  return (
    <DashboardLayout>
      <Helmet
        title={'NFT Influencers Dashboard | Sanbase'}
        meta={[
          {
            property: 'og:title',
            content: 'NFT Influencers Dashboard | Sanbase'
          },
          {
            property: 'og:description',
            content: 'NFT Influencers Trx'
          }
        ]}
      />
      <h1>NFT Influencers Trx</h1>
    </DashboardLayout>
  )
}

export default withRenderQueueProvider(NftInfluencersPage)
