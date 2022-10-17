import React from 'react'
import cx from 'classnames'
import Page from '../../ducks/Page'
import TipPopup from '../../components/EmptySection/Tip/TipPopup'
import PageLoader from '../../components/Loader/PageLoader'
import Table from './Table/Table'
import { useNftQuery } from '../Index/Section/NftInfluencers/hooks'
import styles from './NftInfluencersTrx.module.scss'

const NftInfluencersTrx = () => {
  const { data, loading } = useNftQuery(0, 25)

  if (loading) return <PageLoader />

  return (
    <Page
      title='NFT Influencers Trx'
      isCentered
      isWithPadding
      mainClassName={cx(styles.main, 'relative no-scrollbar')}
    >
      <TipPopup />
      <Table data={data} />
    </Page>
  )
}

export default NftInfluencersTrx
