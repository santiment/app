import React, { PureComponent } from 'react'
import Table from 'react-table'
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
    const { trend, scoreChange } = this.props
    console.log(trend)
    let topWords
    const { topWords: test = [] } = trend
    topWords = test.map(({ word }, index) => {
      const [oldValue, newValue] = scoreChange[word] || []
      return {
        index: index + 1,
        word,
        score: (
          <>
            {newValue} <ValueChange oldValue={oldValue} newValue={newValue} />
          </>
        ),
        volume: (
          <>
            500 <ValueChange oldValue={index * 100} newValue={500} />
          </>
        )
      }
    })
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

const mapStateToProps = ({ hypedTrends: { scoreChange } }) => ({
  scoreChange
})

export default connect(mapStateToProps)(Trends)
