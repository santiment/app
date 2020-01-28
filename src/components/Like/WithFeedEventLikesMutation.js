import { connect } from 'react-redux'
import { FEED_EVENT_LIKE } from './actions'

const withFeedEventLikesMutation = ({ feedEventLikeMutation, children }) =>
  children(id => shouldLike =>
    feedEventLikeMutation({
      id,
      shouldLike
    })
  )

const mapDispatchToProps = dispatch => ({
  feedEventLikeMutation: payload =>
    dispatch({
      type: FEED_EVENT_LIKE,
      payload
    })
})

export default connect(
  null,
  mapDispatchToProps
)(withFeedEventLikesMutation)
