import React, { PureComponent } from 'react'
import Table from 'react-table'
import {
  Icon,
  PanelWithHeader,
  Label,
  toggleSingle,
  toggleMultiple
} from '@santiment-network/ui'
import styles from './TrendTable.module.scss'

const Change = {
  true: ['jungle-green', 'triangle-up'],
  false: ['persimmon', 'triangle-down']
}

const notChanged = ['texas-rose', 'lock-small']

const ValueChange = ({ oldValue, newValue }) => {
  const amp = newValue - oldValue
  const [accent, triangle] = amp !== 0 ? Change[amp > 0] : notChanged

  return (
    <Label accent={accent} className={styles.change}>
      <Icon type={triangle} className={styles.triangle} /> {Math.abs(amp)}
    </Label>
  )
}

const columns = [
  {
    Header: '#',
    accessor: 'index',
    width: 35,
    className: styles.index,
    headerClassName: styles.index
  },
  {
    Header: 'Trending word',
    accessor: 'word',
    className: styles.word
  },
  {
    Header: 'Trending score',
    accessor: 'score'
  },
  {
    Header: 'Social volume',
    accessor: 'volume'
  },
  {
    Cell: props => (
      <div>
        <Icon type='connection' />
      </div>
    ),
    width: 50
  },
  {
    Cell: props => (
      <div>
        <Icon type='insight' />
      </div>
    ),

    width: 50
  }
]

class Trends extends PureComponent {
  render () {
    const { trends } = this.props
    console.log(trends)
    let topWords
    if (trends.length > 0) {
      const [{ topWords: test }] = trends
      topWords = test.map(({ word }, index) => ({
        index: index + 1,
        word,
        score: (
          <>
            500 <ValueChange oldValue={index * 100} newValue={500} />
          </>
        ),
        volume: (
          <>
            500 <ValueChange oldValue={index * 100} newValue={500} />
          </>
        )
      }))
    }
    return (
      <PanelWithHeader
        header='Last trends'
        contentClassName={styles.panel}
        headerClassName={styles.header}
      >
        <Table
          className={styles.table}
          resizable={false}
          data={topWords}
          columns={columns}
          showPagination={false}
          defaultPageSize={10}
          minRows={10}
        />
      </PanelWithHeader>
    )
  }
}

export default Trends
