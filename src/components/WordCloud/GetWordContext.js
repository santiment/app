import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import isEqual from 'lodash.isequal'
import * as actions from './actions'

class GetWordContext extends React.Component {
  componentDidMount () {
    this.props.fetchContext(this.props.word)
  }

  componentDidUpdate (prevProps, prevState) {
    if (!isEqual(this.props.word, prevProps.word)) {
      this.props.fetchContext(this.props.word)
    }
  }

  render () {
    const { render, ...rest } = this.props
    return render(rest)
  }
}

const mapStateToProps = (state, ownProps) => ({
  cloud: state.wordCloud.cloud || ownProps.cloud,
  isLoading: state.wordCloud.isLoading,
  error: state.wordCloud.error,
  searchWord: state.wordCloud.word
})

const mapDispatchToProps = dispatch => ({
  fetchContext: payload => {
    dispatch({
      type: actions.WORDCLOUD_CONTEXT_FETCH,
      payload
    })
  }
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(GetWordContext)
