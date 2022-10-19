import React from 'react'
import cx from 'classnames'
import Info from '../shared/Info/Info'
import Table from '../../../Index/Section/NftInfluencers/Table'
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport'
import dashboardsStyles from '../dashboards.module.scss'

const NFT = () => (
  <section className={cx(dashboardsStyles.wrapper, 'column')}>
    <Info title='NFT Influencers Trx' description='' />
    <main className={cx(dashboardsStyles.content, 'column')}>
      <Table isHome={false} />
    </main>
  </section>
)

export default withRenderQueueProvider(NFT)
