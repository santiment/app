function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Component } from 'react';
import * as qs from 'query-string';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from './../../../../actions/types.js';
import { sortBy } from '../../../../utils/sortMethods';
const MAX_LOAD_SIZE = 1000000;
export const FIRST_LOAD_SIZE = 10;

class GetAssets extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      callFetchAll: false
    };

    this.getInfoFromListname = (listname = '') => {
      const [listName, listId] = listname.split('@');
      return {
        listName,
        listId
      };
    };

    this.getType = () => {
      const {
        search
      } = this.props.location || {};
      const {
        id,
        name
      } = this.props.watchlist || {};
      const {
        listName = name,
        listId = id
      } = compose(this.getInfoFromListname, parsed => parsed.name, qs.parse)(search);
      const type = this.props.type || qs.parse(search);
      return {
        type,
        listName,
        listId
      };
    };
  }

  componentDidMount() {
    this.fetchPreFirst();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      pathname,
      search
    } = this.props.location || {};

    if (pathname !== (prevProps.location || {}).pathname || search !== (prevProps.location || {}).search) {
      this.fetchPreFirst();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.Assets.isLoading && nextProps.Assets.items.length === FIRST_LOAD_SIZE) {
      if (!this.state.callFetchAll) {
        this.fetchAll();
      }
    }
  }

  fetchAll() {
    this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
      callFetchAll: true
    }));
    this.fetch(MAX_LOAD_SIZE);
  }

  fetchPreFirst() {
    this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
      callFetchAll: false
    }));
    this.fetch(FIRST_LOAD_SIZE);
  }

  fetch(pageSize) {
    const {
      type,
      listName,
      listId
    } = this.getType();
    this.props.fetchAssets({
      type,
      list: {
        name: listName,
        id: listId
      },
      minVolume: this.props.minVolume,
      page: 1,
      pageSize
    });
  }

  render() {
    const {
      children,
      render,
      Assets,
      sortBy: sortType
    } = this.props;
    const typeInfo = this.getType();
    const {
      items
    } = Assets;

    const childProps = _objectSpread(_objectSpread({}, Assets), {}, {
      typeInfo,
      items: items.sort(sortBy(sortType))
    });

    childProps.isLoading = this.state.callFetchAll ? false : Assets.isLoading;
    childProps.loadingAll = this.state.callFetchAll && Assets.isLoading;
    return typeof children === 'function' ? children(childProps) : render(childProps);
  }

}

GetAssets.defaultProps = {
  sortBy: 'marketcapUsd',
  Assets: {
    items: []
  }
};

const mapStateToProps = state => {
  return {
    Assets: state.projects,
    minVolume: state.projects.filters.minVolume
  };
};

const mapDispatchToProps = dispatch => ({
  fetchAssets: ({
    type,
    list,
    minVolume,
    page,
    pageSize = MAX_LOAD_SIZE
  }) => {
    return dispatch({
      type: actions.ASSETS_FETCH,
      payload: {
        type,
        list,
        filters: {
          minVolume,
          pageSize,
          page
        }
      }
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GetAssets);