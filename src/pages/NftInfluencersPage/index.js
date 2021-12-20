import React from 'react'
import cx from 'classnames'
import { Helmet } from 'react-helmet'
import { withRenderQueueProvider } from '../../ducks/renderQueue/viewport'
import DashboardLayout from '../../ducks/Dashboards/DashboardLayout'
import Table from '../Index/Section/NftInfluencers/Table'
import SharePage from '../../components/SharePage/SharePage'
import externalStyles from './../StablecoinsPage/StablecoinsPage.module.scss'

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

      <div className={externalStyles.header}>
        <div className={cx(externalStyles.inner, externalStyles.content)}>
          <div className={externalStyles.pageDescription}>
            <h3 className={externalStyles.title}>NFT Influencers Trx</h3>
            <SharePage />
          </div>
        </div>
      </div>

      <div className={externalStyles.body}>
        <div className={externalStyles.inner}>
          <Table isHome={false} />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default withRenderQueueProvider(NftInfluencersPage)
