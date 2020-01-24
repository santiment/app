import { connect } from 'react-redux'
import { FEED_ACTIVITY_LIKE } from './actions'

const withActivityLikesMutation = ({ activityLikeMutation, children }) => {
  return children(id => shouldLike =>
    activityLikeMutation({
      id,
      shouldLike
    })
  )
}

const mapDispatchToProps = dispatch => ({
  activityLikeMutation: payload =>
    dispatch({
      type: FEED_ACTIVITY_LIKE,
      payload
    })
})

export default connect(
  null,
  mapDispatchToProps
)(withActivityLikesMutation)
