import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { Activity, getTwitterAccount } from '../../../Index/Section/NftInfluencers/utils'
import Info from './Info/Info'
import { dateDifferenceInWords } from '../../../../utils/dates'
import { capitalizeStr } from '../../../../utils/utils'
import styles from './Row.module.scss'

const Row = ({ data, isMarket }) => {
  const [isOpened, setIsOpened] = useState(false)

  const { datetime, nft } = data

  const when = dateDifferenceInWords(
    {
      from: new Date(datetime),
      to: new Date(),
      format: 'd',
    },
    'short',
  )
  const account = getTwitterAccount(data)

  if (isMarket) {
    return (
      <tr className={cx(styles.marketRow, 'fluid')}>
        <td className='row v-center justify'>
          <span className={cx(styles.influencer, styles.account, 'body-2 nowrap line-clamp')}>
            {account && `@${account.Name}`}
          </span>
          <div className='row v-center'>
            <Activity onlyIcon original={data} />
            <span className={cx(styles.collection, 'mrg-s mrg--r nowrap')}>
              {capitalizeStr(nft.name)}
            </span>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <tr className='fluid'>
      <td className='column'>
        <button
          className={cx(styles.row, 'row v-center justify body-2')}
          onClick={() => setIsOpened(!isOpened)}
        >
          <div className={cx(styles.influencer, 'row v-center')}>
            <div className={cx(styles.icon, 'row hv-center', isOpened && styles.active)}>
              <Icon type={isOpened ? 'arrow-down' : 'arrow-right'} />
            </div>
            <span className={cx(styles.account, 'nowrap line-clamp')}>
              {account && `@${account.Name}`}
            </span>
          </div>
          <div>
            <Activity onlyIcon original={data} />
          </div>
          <div className={cx(styles.when, 'txt-right')}>{when}</div>
        </button>
        <Info data={data} isOpened={isOpened} />
      </td>
    </tr>
  )
}

export default Row
