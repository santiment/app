import React from 'react'
import cx from 'classnames'
import Row from './Row/Row'
import styles from './Table.module.scss'

export function formatKey({ trxHash, datetime }, idx) {
  return `${trxHash}-${datetime}-${idx}`
}

const Table = ({ data }) => (
  <table className='column'>
    <thead className={cx(styles.header, 'fluid txt-m c-casper')}>
      <tr className='row v-center justify'>
        <th>Twitter influencer</th>
        <th>Activity</th>
        <th>When</th>
      </tr>
    </thead>
    <tbody className={cx(styles.content, 'column')}>
      {data.map((trx, idx) => (
        <Row key={formatKey(trx, idx)} data={trx} />
      ))}
    </tbody>
  </table>
)

export default Table
