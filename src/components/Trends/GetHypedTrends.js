import React from 'react'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
import * as actions from './actions.js'
import { sortBy } from '../../utils/sortMethods'

class GetHypedTrends extends React.Component {
  render () {
    const { render, items, ...rest } = this.props
    const props = {
      ...rest,
      items: sortByHype(items)
    }
    return render(props)
  }

  componentDidMount () {
    this.props.fetchHypedTrends()
  }
}

const sortByHype = items => {
  if (items && items.length > 0) {
    items.map(item => item.topWords.sort(sortBy('score')))
  }
  return items
}

const mapStateToProps = state => {
  return {
    ...state.hypedTrends
  }
}

const mapDispatchToProps = dispatch => ({
  fetchHypedTrends: () => {
    return dispatch({
      type: actions.TRENDS_HYPED_FETCH
    })
  }
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
)

export default enhance(GetHypedTrends)
