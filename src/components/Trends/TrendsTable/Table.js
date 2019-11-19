import React from 'react'
import cx from 'classnames'
import styles from './Table.module.scss'

const Table = ({ rows, columns, classes }) => {
  const headers = []
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          {columns.map(({ id, ...props }, index) => {
            headers.push(id)
            return <td className={styles.th} key={id} {...props} />
          })}
        </tr>
      </thead>
      <tbody className={cx(classes.tbody)}>
        {rows.map((row, i) => (
          <tr className={styles.tr} key={i}>
            {headers.map(header => (
              <td className={styles.td} key={header}>
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

Table.defaultProps = {
  rows: [],
  columns: [],
  classes: {}
}

export default Table
