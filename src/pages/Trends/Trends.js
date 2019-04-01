import React, { PureComponent } from 'react'
import Table from 'react-table'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { store } from '../../index'
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

const getContextCells = iconProps => {
  return []
}

const dis = payload =>
  store.dispatch({
    type: 'TREND_WORD_SCORE_CHANGE',
    payload
  })

window.dis = dis

class Trends extends PureComponent {
  componentDidUpdate ({ trend: { datetime: prevDatetime } }) {
    if (prevDatetime !== this.props.trend.datetime) {
      dis(this.props.trend.datetime)
    }
  }

  render () {
    const {
      notSelected,
      trend,
      scoreChange,
      volumeChange,
      allAssets,
      header
    } = this.props

    let topWords
    const { topWords: test = [] } = trend
    topWords = test.map(({ word }, index) => {
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
        contentClassName={styles.panel}
        headerClassName={styles.header}
      >
        <Table
          className={styles.table}
          resizable={false}
          data={topWords}
          columns={notSelected ? columns.slice(0, 2) : columns}
          showPagination={false}
          defaultPageSize={10}
          minRows={10}
        />
      </PanelWithHeader>
    )
  }
}

const mapStateToProps = ({
  hypedTrends: { scoreChange, volumeChange, allAssets }
}) => ({
  scoreChange,
  volumeChange,
  allAssets
})

export default connect(mapStateToProps)(Trends)
