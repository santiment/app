import React from 'react'
import cx from 'classnames'
import Row from './Row/Row'
import styles from './Table.module.scss'

export function formatKey({ trxHash, datetime }, idx) {
  return `${trxHash}-${datetime}-${idx}`
}

const Table = ({ data }) => (
  <div className='column'>
    <div className={cx(styles.header, 'fluid txt-m c-casper row v-center justify')}>
      <span>Twitter influencer</span>
      <span>Activity</span>
      <span className='txt-right'>When</span>
    </div>
    <div className={cx(styles.content, 'column')}>
      {data.map((trx, idx) => (
        <Row key={formatKey(trx, idx)} data={trx} />
      ))}
    </div>
  </div>
)

export default Table
