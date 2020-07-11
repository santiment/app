import React from 'react'
import { connect } from 'react-redux'
import NotificationActions from '../../../../components/NotificationActions/NotificationActions'
import { USER_REMOVE_ASSET_LIST } from '../../../../actions/types'

const WatchlistNotificationActions = ({ id, toLink, onDelete }) => {
  return (
    <NotificationActions
      id={id}
      link={toLink}
      isDialog={false}
      onClick={() => onDelete(id)}
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => {
      dispatch({
        type: USER_REMOVE_ASSET_LIST,
        payload: { id }
      })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(WatchlistNotificationActions)
