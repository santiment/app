import React from 'react'
import cx from 'classnames'
import { FluidSkeleton as Skeleton } from '../../../components/Skeleton'
import Row from './Row/Row'
import { useNftQuery } from '../../Index/Section/NftInfluencers/hooks'
import { formatKey } from './Table'
import styles from './Table.module.scss'

const MarketTable = () => {
  const { data, loading } = useNftQuery(0, 5)

  return (
    <table className={cx(styles.marketTable, 'fluid column relative')}>
      {!loading && data.map((trx, idx) => <Row key={formatKey(trx, idx)} data={trx} isMarket />)}
      <caption>
        <Skeleton show={loading} className={styles.skeleton} />
      </caption>
    </table>
  )
}

export default MarketTable
