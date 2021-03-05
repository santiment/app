import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { getTitleByWatchlistType } from '../../detector'
import { useRemoveWatchlist } from '../../gql/list/mutations'
import ConfirmDialog from '../../../../components/ConfirmDialog/ConfirmDialog'

const WatchlistDeleteDialog = ({ type, ...props }) => {
  const title = `Do you want to delete this ${getTitleByWatchlistType(type)}?`
  const { onDelete } = useRemoveWatchlist(type)

  return <ConfirmDialog title={title} {...props} onApprove={onDelete} />
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
