import { connect } from 'react-redux'
import { INSIGHTS_LIKE } from './actions'

const withInsightLikesMutation = ({ insightLikeMutation, children }) =>
<<<<<<< HEAD
  children((id) => (shouldLike) =>
    insightLikeMutation({
      id,
      shouldLike,
    }),
=======
  children(
    (id) => (shouldLike) =>
      insightLikeMutation({
        id,
        shouldLike,
      }),
>>>>>>> master
  )

const mapDispatchToProps = (dispatch) => ({
  insightLikeMutation: (payload) =>
    dispatch({
      type: INSIGHTS_LIKE,
      payload,
    }),
})

export default connect(null, mapDispatchToProps)(withInsightLikesMutation)
