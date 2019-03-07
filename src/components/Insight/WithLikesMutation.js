import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { LIKE_INSIGHT_MUTATION, UNLIKE_INSIGHT_MUTATION } from './insightsGQL'

const Mutations = {
  insights: [LIKE_INSIGHT_MUTATION, UNLIKE_INSIGHT_MUTATION]
  /* comments: [LIKE_COMMENT_MUTATION, UNLIKE_COMMENT_MUTATION] */
}

const withLikesMutation = ({ isFor, children }) => {
  const [LIKE_MUTATION, UNLIKE_MUTATION] = Mutations[isFor]

  return (
    <Mutation mutation={LIKE_MUTATION}>
      {like => (
        <Mutation mutation={UNLIKE_MUTATION}>
          {unlike => children(like, unlike)}
        </Mutation>
      )}
    </Mutation>
  )
}

withLikesMutation.propTypes = {
  isFor: PropTypes.oneOf(['insights']).isRequired
}

export default withLikesMutation
