import { Component } from 'react'
import PropTypes from 'prop-types'
import * as qs from 'query-string'
import { connect } from 'react-redux'
import { compose } from 'redux'
import * as actions from './../../actions/types.js'
import { sortBy } from './../../utils/sortMethods'

export const SORT_TYPES = {
  marketcap: 'marketcapUsd',
  devActivity: 'averageDevActivity',
  ethSpent: 'ethSpent'
}

class GetAssets extends Component {
  static defaultProps = {
    sortBy: PropTypes.string.isRequired
  }

  static defaultProps = {
    sortBy: SORT_TYPES.marketcap,
    Assets: {
      items: []
    }
  }

  getNameIdFromListname = (listname = '') => {
    const data = listname.split('@')
    return {
      listName: data[0],
      listId: data[1]
    }
  }

  getType = () => {
    const { search, hash } = this.props.location || {}
    const { listName, listId } = compose(
      this.getNameIdFromListname,
      parsed => parsed.name,
      qs.parse
    )(search)
    const type =
      hash === '#shared' ? 'list#shared' : this.props.type || qs.parse(search)
    return { type, listName, listId }
  }

  componentDidMount () {
    const { type, listName, listId } = this.getType()
    this.props.fetchAssets({
      type,
      list: {
        name: listName,
        id: listId
      },
      minVolume: this.props.minVolume
    })
  }

  componentDidUpdate (prevProps, prevState) {
    const { pathname, search } = this.props.location || {}
    if (
      pathname !== (prevProps.location || {}).pathname ||
      search !== (prevProps.location || {}).search
    ) {
      const { type, listName, listId } = this.getType()
      this.props.fetchAssets({
        type,
        list: {
          name: listName,
          id: listId
        },
        minVolume: this.props.minVolume
      })
    }
  }

  render () {
    const { children, render } = this.props
    const typeInfo = this.getType()
    const { Assets, sortBy: sortType } = this.props
    const items = Assets.items
    const props = {
      ...Assets,
      typeInfo,
      items: items.sort(sortBy(sortType))
    }
    if (typeof children === 'function') return children(props)
    return render(props)
  }
}

const mapStateToProps = state => {
  return {
    Assets: state.projects,
    minVolume: state.projects.filters.minVolume
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAssets: ({ type, list, minVolume }) => {
    return dispatch({
      type: actions.ASSETS_FETCH,
      payload: {
        type,
        list,
        filters: {
          minVolume
        }
      }
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetAssets)
