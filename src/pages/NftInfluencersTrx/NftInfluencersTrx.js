import React from 'react'
import cx from 'classnames'
import Page from '../../ducks/Page'
import TipPopup from '../../components/EmptySection/Tip/TipPopup'
import Table from './Table/Table'
import styles from './NftInfluencersTrx.module.scss'

const NftInfluencersTrx = () => (
  <Page
    title='NFT Influencers Trx'
    isCentered
    isWithPadding
    mainClassName={cx(styles.main, 'relative no-scrollbar')}
  >
    <TipPopup />
    <Table />
  </Page>
)

export default NftInfluencersTrx
