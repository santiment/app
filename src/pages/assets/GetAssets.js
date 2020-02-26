import { Component } from 'react'
import PropTypes from 'prop-types'
import * as qs from 'query-string'
import { connect } from 'react-redux'
import { compose } from 'redux'
import * as actions from './../../actions/types.js'
import { sortBy } from './../../utils/sortMethods'
import { WATCHLISTS_BY_SLUG } from '../assets/assets-overview-constants'

export const SORT_TYPES = {
  marketcap: 'marketcapUsd',
  devActivity: 'averageDevActivity',
  ethSpent: 'ethSpent'
}

const MAX_PER_PAGE = 1000000

class GetAssets extends Component {
  static defaultProps = {
    sortBy: PropTypes.string.isRequired,
    page: 1,
    pageSize: MAX_PER_PAGE
  }

  static defaultProps = {
    sortBy: SORT_TYPES.marketcap,
    Assets: { items: [] }
  }

  getInfoFromListname = (listname = '') => {
    const [listName, listId] = listname.split('@')
    const listBySlug = WATCHLISTS_BY_SLUG.find(
      ({ assetType }) => assetType === listName
    )
    return listId
      ? { listName, listId }
      : { listName, listSlug: listBySlug && listBySlug.bySlug }
  }

  getType = () => {
    const { search, hash } = this.props.location || {}
    const { listName, listId, listSlug } = compose(
      this.getInfoFromListname,
      parsed => parsed.name,
      qs.parse
    )(search)
    const type =
      hash === '#shared' ? 'list#shared' : this.props.type || qs.parse(search)
    return { type, listName, listId, listSlug }
  }

  componentDidMount () {
    this.fetch()
  }

  componentDidUpdate (prevProps, prevState) {
    const { pathname, search } = this.props.location || {}
    if (
      pathname !== (prevProps.location || {}).pathname ||
      search !== (prevProps.location || {}).search ||
      this.props.page !== prevProps.page
    ) {
      this.fetch()
    }
  }

  fetch (page = this.props.page) {
    const { type, listName, listId, listSlug } = this.getType()
    this.props.fetchAssets({
      type,
      list: { name: listName, id: listId, slug: listSlug },
      minVolume: this.props.minVolume,
      page: page,
      pageSize: this.props.pageSize
    })
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
  fetchAssets: ({
    type,
    list,
    minVolume,
    page = 1,
    pageSize = MAX_PER_PAGE
  }) => {
    return dispatch({
      type: actions.ASSETS_FETCH,
      payload: {
        type,
        list,
        filters: { minVolume, page, pageSize }
      }
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetAssets)
