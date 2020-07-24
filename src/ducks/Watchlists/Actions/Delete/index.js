import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { USER_REMOVE_ASSET_LIST } from '../../../../actions/types'
import ConfirmDialog from '../../../../components/ConfirmDialog/ConfirmDialog'

class WatchlistDeleteDialog extends ConfirmDialog {}

const mapDispatchToProps = dispatch => {
  return {
    onApprove: (id, name) => {
      dispatch({
        type: USER_REMOVE_ASSET_LIST,
        payload: { id, name }
      })
    },
    redirect: () => dispatch(push('/assets'))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(WatchlistDeleteDialog)
