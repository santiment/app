import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import getColumns from './gainers-and-losers-table-columns'
import { fetchGainersOrLosers } from './actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class GainersLosersTable extends React.Component {
  componentDidMount () {
    const { status, fetchGainersOrLosers, timeWindow } = this.props
    fetchGainersOrLosers({ status, timeWindow })
  }

  componentWillReceiveProps ({ status, timeWindow }) {
    if (status !== this.props.status || timeWindow !== this.props.timeWindow) {
      this.props.fetchGainersOrLosers({
        status,
        timeWindow
      })
    }
  }

  render () {
    const { gainersAndLosers, isLoading, timeWindow } = this.props
    return (
      <ReactTable
        loading={isLoading}
        showPaginationTop={false}
        showPaginationBottom
        defaultPageSize={10}
        getTheadThProps={() => ({ style: { textAlign: 'center' } })}
        getTrProps={() => ({ style: { textAlign: 'center' } })}
        getTdProps={() => ({
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }
        })}
        getTbodyProps={() => ({ style: { overflow: 'hidden' } })}
        pageSizeOptions={[5, 10, 20, 25, 50, 100]}
        sortable={false}
        loadingText='Loading...'
        resizable
        data={gainersAndLosers}
        columns={getColumns({ timeWindow })}
      />
    )
  }
}

const mapStateToProps = ({ gainersLosers }) => ({
  isLoading: gainersLosers.isLoading,
  gainersAndLosers: gainersLosers.gainersAndLosers
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchGainersOrLosers
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GainersLosersTable)
