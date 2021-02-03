import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import ConfirmDialog from '../../../../components/ConfirmDialog/ConfirmDialog'
import { useRemovingWatchlist } from '../../gql/hooks'

const WatchlistDeleteDialog = props => {
  const { onDelete } = useRemovingWatchlist()

  return <ConfirmDialog {...props} onApprove={onDelete} />
}

const mapDispatchToProps = dispatch => {
  return {
    redirect: () => dispatch(push('/assets'))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(WatchlistDeleteDialog)
