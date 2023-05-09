const _excluded = ["trigger", "applyChanges", "setNotification", "projectId", "watchlistUi", "dialogProps"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import { connect } from 'react-redux';
import Dialog from '@santiment-network/ui/Dialog';
import Button from '@santiment-network/ui/Button';
import { USER_ADD_ASSET_TO_LIST, USER_REMOVE_ASSET_FROM_LIST } from '../../../../actions/types';
import { showNotification } from '../../../../actions/rootActions';
import Watchlists from '../../Templates/Watchlists';
import { hasAssetById } from '../../utils';
import LoginPopup from '../../../../components/banners/feature/PopupBanner';
import { useUser } from '../../../../stores/user';
import { useProjectWatchlists } from '../../gql/lists/hooks';
import styles from './index.module.css';
const AddToListBtn = /*#__PURE__*/React.createElement(Button, {
  variant: "fill",
  accent: "positive",
  className: styles.btn
}, "Add to watchlists");

const WatchlistPopup = _ref => {
  let {
    trigger = AddToListBtn,
    applyChanges,
    setNotification,
    projectId,
    watchlistUi: {
      editableAssetsInList
    },
    dialogProps
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const {
    isLoggedIn
  } = useUser();
  const [watchlists] = useProjectWatchlists();
  const [changes, setChanges] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [editableAssets, setEditableAssets] = useState(editableAssetsInList);

  if (!isLoggedIn) {
    return /*#__PURE__*/React.createElement(LoginPopup, null, trigger);
  }

  const lists = watchlists.map(list => _objectSpread(_objectSpread({}, list), {}, {
    listItems: list.listItems.map(assets => assets.project)
  }));

  const addChange = change => {
    const prevLength = changes.length;
    const changesWithoutProjectAndList = changes.filter(({
      projectId,
      assetsListId
    }) => projectId !== change.projectId || assetsListId !== change.assetsListId);
    const currLength = changesWithoutProjectAndList.length;
    prevLength === currLength ? setChanges([...changes, change]) : setChanges(changesWithoutProjectAndList);
  };

  const close = () => {
    setChanges([]);
    setIsShown(false);
  };

  const open = () => setIsShown(true);

  const toggleAssetInList = ({
    id: assetsListId,
    listItems,
    slug
  }) => {
    if (!projectId) return;
    const isAssetInList = hasAssetById({
      listItems: lists.find(({
        id
      }) => id === assetsListId).listItems,
      id: projectId
    });
    addChange({
      projectId,
      assetsListId,
      listItems,
      slug,
      isAssetInList
    });
  };

  if (editableAssetsInList !== editableAssets) {
    setEditableAssets(editableAssetsInList);

    if (editableAssetsInList.length === 0) {
      const amount = changes.length;

      if (amount !== 0) {
        setNotification(`${amount} watchlist${amount > 1 ? 's were' : ' was'} modified`);
      }

      close();
    }
  }

  const add = () => applyChanges(changes);

  return /*#__PURE__*/React.createElement(Dialog, _extends({
    title: "Add to watchlist",
    trigger: trigger,
    onOpen: open,
    onClose: close,
    open: isShown
  }, dialogProps), /*#__PURE__*/React.createElement(Dialog.ScrollContent, {
    withPadding: true,
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(Watchlists, _extends({
    onWatchlistClick: watchlist => toggleAssetInList(watchlist),
    lists: lists,
    projectId: projectId,
    source: "add_item_to_watchlist_create_new"
  }, props))), /*#__PURE__*/React.createElement(Dialog.Actions, {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(Dialog.Cancel, {
    onClick: close,
    type: "cancel"
  }, "Cancel"), /*#__PURE__*/React.createElement(Dialog.Approve, {
    disabled: editableAssetsInList.length > 0 || changes.length === 0,
    isLoading: editableAssetsInList.length > 0,
    type: "submit",
    onClick: add,
    className: styles.approve
  }, "Apply")));
};

const mapStateToProps = state => ({
  watchlistUi: state.watchlistUi
});

const mapDispatchToProps = dispatch => ({
  applyChanges: changes => {
    changes.map(({
      projectId,
      assetsListId,
      listItems,
      slug,
      isAssetInList
    }) => dispatch({
      type: isAssetInList ? USER_REMOVE_ASSET_FROM_LIST : USER_ADD_ASSET_TO_LIST,
      payload: {
        projectId,
        assetsListId,
        listItems,
        slug
      }
    }));
  },
  setNotification: message => dispatch(showNotification(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistPopup);