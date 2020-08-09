import { Component } from 'react'
import * as qs from 'query-string'
import { connect } from 'react-redux'
import { compose } from 'redux'
import * as actions from './../../../../actions/types.js'
import { sortBy } from './../../../../utils/sortMethods'

export const SORT_TYPES = {
  marketcap: 'marketcapUsd',
  devActivity: 'averageDevActivity',
  ethSpent: 'ethSpent'
}

const MAX_LOAD_SIZE = 1000000
export const FIRST_LOAD_SIZE = 10

class GetAssets extends Component {
  state = {
    callFetchAll: false
  }

  static defaultProps = {
    sortBy: SORT_TYPES.marketcap,
    Assets: { items: [] }
  }

  getInfoFromListname = (listname = '') => {
    const [listName, listId] = listname.split('@')

    return { listName, listId }
  }

  getType = () => {
    const { search, hash } = this.props.location || {}
    const { listName, listId } = compose(
      this.getInfoFromListname,
      parsed => parsed.name,
      qs.parse
    )(search)

    const type = this.props.type || qs.parse(search)
    return { type, listName, listId }
  }

  componentDidMount () {
    this.fetchPreFirst()
  }

  componentDidUpdate (prevProps, prevState) {
    const { pathname, search } = this.props.location || {}
    if (
      pathname !== (prevProps.location || {}).pathname ||
      search !== (prevProps.location || {}).search
    ) {
      this.fetchPreFirst()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (
      !nextProps.Assets.isLoading &&
      nextProps.Assets.items.length === FIRST_LOAD_SIZE
    ) {
      if (!this.state.callFetchAll) {
        this.fetchAll()
      }
    }
  }

  fetchAll () {
    this.setState({ ...this.state, callFetchAll: true })
    this.fetch(MAX_LOAD_SIZE)
  }

  fetchPreFirst () {
    this.setState({ ...this.state, callFetchAll: false })
    this.fetch(FIRST_LOAD_SIZE)
  }

  fetch (pageSize) {
    const { type, listName, listId } = this.getType()
    this.props.fetchAssets({
      type,
      list: { name: listName, id: listId },
      minVolume: this.props.minVolume,
      page: 1,
      pageSize
    })
  }

  render () {
    const { children, render, Assets, sortBy: sortType } = this.props
    const typeInfo = this.getType()
    const { items } = Assets

    const childProps = {
      ...Assets,
      typeInfo,
      items: items.sort(sortBy(sortType))
    }

    childProps.isLoading = this.state.callFetchAll ? false : Assets.isLoading
    childProps.loadingAll = this.state.callFetchAll && Assets.isLoading

    return typeof children === 'function'
      ? children(childProps)
      : render(childProps)
  }
}

const mapStateToProps = state => {
  return {
    Assets: state.projects,
    minVolume: state.projects.filters.minVolume
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAssets: ({ type, list, minVolume, page, pageSize = MAX_LOAD_SIZE }) => {
    return dispatch({
      type: actions.ASSETS_FETCH,
      payload: {
        type,
        list,
        filters: { minVolume, pageSize, page }
      }
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetAssets)
