import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { dateDifferenceInWords } from 'webkit/utils/dates'
import { Activity, getTwitterAccount } from '../../../Index/Section/NftInfluencers/utils'
import Info from './Info/Info'
import styles from './Row.module.scss'

const Row = ({ data }) => {
  const { datetime } = data
  const [isOpened, setIsOpened] = useState(false)

  const when = dateDifferenceInWords(new Date(datetime))
  const account = getTwitterAccount(data)

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
