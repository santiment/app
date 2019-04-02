import React, { PureComponent } from 'react'
import Table from 'react-table'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { PanelWithHeader } from '@santiment-network/ui'
import ValueChange from '../../../components/ValueChange/ValueChange'
import styles from './TrendsTable.module.scss'

const columns = [
  {
    Header: '#',
    accessor: 'index',
    width: 35,
    className: styles.index,
    headerClassName: styles.index
  },
  {
    Header: 'Word',
    accessor: 'word'
  },
  {
    Header: 'Trending score',
    accessor: 'score'
  },
  {
    Header: 'Social volume',
    accessor: 'volume'
  }
]

class TrendsTable extends PureComponent {
  render () {
    const {
      notSelected,
      trend: { topWords = [] },
      scoreChange,
      volumeChange,
      header,
      className
    } = this.props

    const tableData = topWords.map(({ word }, index) => {
      const [oldScore = 0, newScore = 0] = scoreChange[word] || []
      const [oldVolume = 0, newVolume = 0] = volumeChange[word] || []
      return {
        index: index + 1,
        word: (
          <Link className={styles.word} to={`/labs/trends/explore/${word}`}>
            {word}
          </Link>
        ),
        score: (
          <>
            {newScore} <ValueChange oldValue={oldScore} newValue={newScore} />
          </>
        ),
        volume: (
          <>
            {newVolume}{' '}
            <ValueChange oldValue={oldVolume} newValue={newVolume} />
          </>
        )
      }
    })

    return (
      <PanelWithHeader
        header={header}
        className={className}
        contentClassName={styles.panel}
        headerClassName={styles.header}
      >
        <Table
          className={styles.table}
          sortable={false}
          resizable={false}
          data={tableData}
          columns={notSelected ? columns.slice(0, 2) : columns}
          showPagination={false}
          defaultPageSize={10}
          minRows={10}
        />
      </PanelWithHeader>
    )
  }
}

const mapStateToProps = ({ hypedTrends: { scoreChange, volumeChange } }) => ({
  scoreChange,
  volumeChange
})

export default connect(mapStateToProps)(TrendsTable)
