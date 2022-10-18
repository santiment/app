import React from 'react'
import cx from 'classnames'
import { FluidSkeleton as Skeleton } from '../../../components/Skeleton'
import Row from './Row/Row'
import { useNftQuery } from '../../Index/Section/NftInfluencers/hooks'
import styles from './Table.module.scss'

export function formatKey({ trxHash, datetime }, idx) {
  return `${trxHash}-${datetime}-${idx}`
}

const Table = ({ isMarket }) => {
  const { data, loading } = useNftQuery(0, isMarket ? 5 : 25)

  return (
    <div className='column relative'>
      {!isMarket && (
        <div className={cx(styles.header, 'fluid txt-m c-casper row v-center justify')}>
          <span>Twitter influencer</span>
          <span>Activity</span>
          <span className='txt-right'>When</span>
        </div>
      )}
      <div className={cx(styles.content, isMarket && styles.marketTable, 'fluid column')}>
        {!loading &&
          data.map((trx, idx) => <Row key={formatKey(trx, idx)} data={trx} isMarket={isMarket} />)}
        <Skeleton show={loading} className={styles.skeleton} />
      </div>
    </div>
  )
}

export default Table
