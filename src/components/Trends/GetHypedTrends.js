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

  componentDidUpdate ({ from: prevFrom, to: prevTo, interval: prevInterval }) {
    const { from, to, interval, onlyTrends } = this.props

    if (from !== prevFrom || to !== prevTo || interval !== prevInterval) {
      this.props.fetchHypedTrends({ from, to, interval, onlyTrends })
    }
  }

  componentDidMount () {
    const { fetchHypedTrends, from, to, interval, onlyTrends } = this.props
    fetchHypedTrends({ from, to, interval, onlyTrends })
  }
}

const sortByHype = items => {
  if (items && items.length > 0) {
    items.map(item => item.topWords.sort(sortBy('score')))
  }
  return items
}

const mapStateToProps = ({ hypedTrends: { onlyTrends, ...state } }) => {
  return state
}

const mapDispatchToProps = dispatch => ({
  fetchHypedTrends: payload => {
    return dispatch({
      type: actions.TRENDS_HYPED_FETCH,
      payload
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
