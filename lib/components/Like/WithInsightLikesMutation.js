import { connect } from 'react-redux';
import { INSIGHTS_LIKE } from './actions';

const withInsightLikesMutation = ({
  insightLikeMutation,
  children
}) => children(id => shouldLike => insightLikeMutation({
  id,
  shouldLike
}));

const mapDispatchToProps = dispatch => ({
  insightLikeMutation: payload => dispatch({
    type: INSIGHTS_LIKE,
    payload
  })
});

export default connect(null, mapDispatchToProps)(withInsightLikesMutation);