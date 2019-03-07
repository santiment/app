import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { connect } from 'react-redux'
import { LIKE_INSIGHT_MUTATION, UNLIKE_INSIGHT_MUTATION } from './insightsGQL'

const Mutations = {
  insights: [LIKE_INSIGHT_MUTATION, UNLIKE_INSIGHT_MUTATION]
  /* comments: [LIKE_COMMENT_MUTATION, UNLIKE_COMMENT_MUTATION] */
}

const withLikesMutation = ({ isFor, insightLikeMutation, children }) => {
  const mutation = isFor === 'insights' ? insightLikeMutation : undefined

  return children(id => liked => ({ id, liked }))
}

withLikesMutation.propTypes = {
  isFor: PropTypes.oneOf(['insights']).isRequired
}

const mapDispatchToProps = dispatch => ({
  insightLikeMutation: payload => ({
    type: '[voting] INSIGHTS_LIKE',
    payload
  })
})

export default connect(
  null,
  mapDispatchToProps
)(withLikesMutation)
