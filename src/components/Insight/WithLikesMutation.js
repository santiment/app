import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { INSIGHTS_LIKE } from './likesEpic'

const withLikesMutation = ({ isFor, insightLikeMutation, children }) => {
  return children(id => shouldLike =>
    insightLikeMutation({
      id,
      shouldLike
    })
  )
}

withLikesMutation.propTypes = {
  isFor: PropTypes.oneOf(['insights']).isRequired
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
