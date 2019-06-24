import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { USER_REMOVE_ASSET_LIST } from '../../actions/types'
import DeleteDialog from '../../components/DeleteDialog/DeleteDialog'

class WatchlistDeleteDialog extends DeleteDialog {}

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: id => {
      dispatch({
        type: USER_REMOVE_ASSET_LIST,
        payload: { id }
      })
    },
    redirect: () => dispatch(push('/assets'))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(WatchlistDeleteDialog)
