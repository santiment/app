import React from 'react'
import { connect } from 'react-redux'
import { INSIGHTS_LIKE } from '../../components/Like/actions'
import LikeBtn from '../../components/Like/LikeBtn'
import ShareModalTrigger from '../../components/Share/ShareModalTrigger'

const InsightReactionButtons = ({
  id,
  isVoted,
  totalVotes,
  classes,
  onLikesClick,
  alignLike = 'right',
  insightLikeMutation
}) => (
  <div className={classes.wrapper}>
    <LikeBtn
      likesNumber={totalVotes}
      align={alignLike}
      liked={isVoted}
      onClick={() => {
        insightLikeMutation({ id, shouldLike: !isVoted })
        onLikesClick()
      }}
      className={classes.like}
      useProps={true}
    />
    <ShareModalTrigger asIcon shareLink={window.location.href} />
  </div>
)

const mapDispatchToProps = dispatch => ({
  insightLikeMutation: payload => dispatch({ type: INSIGHTS_LIKE, payload })
})

export default connect(
  null,
  mapDispatchToProps
)(InsightReactionButtons)
