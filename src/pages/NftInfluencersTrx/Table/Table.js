import React from 'react'
import cx from 'classnames'
import { FluidSkeleton as Skeleton } from '../../../components/Skeleton'
import TipPopup from '../../../components/EmptySection/Tip/TipPopup'
import Row from './Row/Row'
import { useNftQuery } from '../../Index/Section/NftInfluencers/hooks'
import styles from './Table.module.scss'

export function formatKey({ trxHash, datetime }, idx) {
  return `${trxHash}-${datetime}-${idx}`
}

const Table = () => {
  const { data, loading } = useNftQuery(0, 25)

  return (
    <>
      {!loading && <TipPopup />}
      <div className='column relative'>
        <div className={cx(styles.header, 'fluid txt-m c-casper row v-center justify')}>
          <span>Twitter influencer</span>
          <span>Activity</span>
          <span className='txt-right'>When</span>
        </div>
        <div className={cx(styles.content, 'fluid column')}>
          {!loading && data.map((trx, idx) => <Row key={formatKey(trx, idx)} data={trx} />)}
          <Skeleton show={loading} className={styles.skeleton} />
        </div>
      </div>
    </>
  )
}

export default Table
