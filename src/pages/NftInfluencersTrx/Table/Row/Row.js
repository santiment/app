import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { dateDifferenceInWords } from 'webkit/utils/dates'
import { Activity, getTwitterAccount } from '../../../Index/Section/NftInfluencers/utils'
import Info from './Info/Info'
import { capitalizeStr } from '../../../../utils/utils'
import styles from './Row.module.scss'

const Row = ({ data, isMarket }) => {
  const [isOpened, setIsOpened] = useState(false)

  const { datetime, nft } = data

  const when = dateDifferenceInWords(new Date(datetime))
  const account = getTwitterAccount(data)

  if (isMarket) {
    return (
      <div className={cx(styles.marketRow, 'fluid row v-center justify')}>
        <span className={cx(styles.influencer, styles.account, 'body-2 single-line')}>
          {account && `@${account.Name}`}
        </span>
        <div className='row v-center'>
          <Activity onlyIcon original={data} />
          <span className={cx(styles.collection, 'mrg-s mrg--r single-line')}>
            {capitalizeStr(nft.name)}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className='fluid column'>
      <button
        className={cx(styles.row, 'row v-center justify body-2')}
        onClick={() => setIsOpened(!isOpened)}
      >
        <div className={cx(styles.influencer, 'row v-center')}>
          <div className={cx(styles.icon, 'row hv-center', isOpened && styles.active)}>
            <Icon type={isOpened ? 'arrow-down' : 'arrow-right'} />
          </div>
          <span className={cx(styles.account, 'single-line')}>{account && `@${account.Name}`}</span>
        </div>
        <div>
          <Activity onlyIcon original={data} />
        </div>
        <div className={cx(styles.when, 'txt-right')}>{when}</div>
      </button>
      <Info data={data} isOpened={isOpened} />
    </div>
  )
}

export default Row
