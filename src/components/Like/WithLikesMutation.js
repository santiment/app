import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { INSIGHTS_LIKE } from './actions'

const withLikesMutation = ({ insightLikeMutation, children }) => {
  return children(id => shouldLike =>
    insightLikeMutation({
      id,
      shouldLike
    })
  )
}

const mapDispatchToProps = dispatch => ({
  insightLikeMutation: payload =>
    dispatch({
      type: INSIGHTS_LIKE,
      payload
    })
})

export default connect(
  null,
  mapDispatchToProps
)(withLikesMutation)
