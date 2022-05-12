import React from 'react'
import cx from 'classnames'
import Header from '../Header/Header'
import Table from '../../../Index/Section/NftInfluencers/Table'
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport'
import dashboardsStyles from '../dashboards.module.scss'

const NFTTx = ({ shareLinkText, description }) => (
  <div className='column fluid'>
    <Header shareLinkText={shareLinkText} description={description} />
    <div className={cx('column', dashboardsStyles.content)}>
      <Table isHome={false} />
    </div>
  </div>
)

export default withRenderQueueProvider(NFTTx)
