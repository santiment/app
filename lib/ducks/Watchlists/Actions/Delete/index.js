const _excluded = ["type"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { getTitleByWatchlistType } from '../../detector';
import { useRemoveWatchlist } from '../../gql/list/mutations';
import ConfirmDialog from '../../../../components/ConfirmDialog/ConfirmDialog';

const WatchlistDeleteDialog = _ref => {
  let {
    type
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const title = `Do you want to delete this ${getTitleByWatchlistType(type)}?`;
  const {
    onDelete
  } = useRemoveWatchlist(type);
  return /*#__PURE__*/React.createElement(ConfirmDialog, _extends({
    title: title
  }, props, {
    onApprove: onDelete
  }));
};

const mapDispatchToProps = dispatch => {
  return {
    redirect: () => dispatch(push('/assets'))
  };
};

export default connect(null, mapDispatchToProps)(WatchlistDeleteDialog);