import React from 'react'
import cx from 'classnames'
import { FluidSkeleton as Skeleton } from '../../../components/Skeleton'
import { Activity, getTwitterAccount } from '../../Index/Section/NftInfluencers/utils'
import { formatKey } from './Table'
import { useNftQuery } from '../../Index/Section/NftInfluencers/hooks'
import { capitalizeStr } from '../../../utils/utils'
import rowStyles from './Row/Row.module.scss'
import styles from './Table.module.scss'

const MarketTable = () => {
  const { data, loading } = useNftQuery(0, 5)

  return (
    <div className={cx(styles.content, styles.marketTable, 'fluid column relative')}>
      {!loading &&
        data.map((trx, idx) => {
          const { nft } = trx
          const account = getTwitterAccount(trx)

          return (
            <div
              key={formatKey(trx, idx)}
              className={cx(rowStyles.marketRow, 'fluid row v-center justify')}
            >
              <span className={cx(rowStyles.influencer, rowStyles.account, 'body-2 single-line')}>
                {account && `@${account.Name}`}
              </span>
              <div className='row v-center'>
                <Activity onlyIcon original={trx} />
                <span className={cx(rowStyles.collection, 'mrg-s mrg--r single-line')}>
                  {capitalizeStr(nft.name)}
                </span>
              </div>
            </div>
          )
        })}
      <Skeleton show={loading} className={cx(styles.skeleton, styles.skeletonMarket)} />
    </div>
  )
}

export default MarketTable
