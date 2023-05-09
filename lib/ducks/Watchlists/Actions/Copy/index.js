const _excluded = ["listItems"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import { connect } from 'react-redux';
import Dialog from '@santiment-network/ui/Dialog';
import { USER_EDIT_ASSETS_IN_LIST } from '../../../../actions/types';
import { sortByAsDates } from '../../../../utils/sortMethods';
import { showNotification } from '../../../../actions/rootActions';
import Watchlists from '../../Templates/Watchlists';
import AssetsList from './AssetsList';
import { useUser } from '../../../../stores/user/index';
import LoginPopup from '../../../../components/banners/feature/PopupBanner';
import { useUserWatchlists } from '../../gql/lists/hooks';
import { BLOCKCHAIN_ADDRESS } from '../../detector';
import { mapAddressToAPIType } from '../../../../ducks/Watchlists/utils';
import { useAddWatchlistItems } from '../../../../ducks/Watchlists/Widgets/Table/CompareInfo/Actions/hooks';
import styles from './index.module.css';

const WatchlistCopyPopup = ({
  assets = [],
  trigger,
  watchlistUi: {
    editableWatchlists
  },
  id: currentId,
  sendChanges,
  setNotification,
  checkedAssets = new Set(),
  type
}) => {
  const {
    isLoggedIn
  } = useUser();
  const [watchlists, isWatchlistsLoading] = useUserWatchlists(type);
  const [isShown, setIsShown] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [warning, setWarning] = useState(false);
  const [assetsToCopy, setAssetsToCopy] = useState();
  const [watchlistsToCopy, setWatchlistsToCopy] = useState(new Set());
  const [editWatchlistState, setEditWatchlistState] = useState(editableWatchlists);
  const {
    addWatchlistItems
  } = useAddWatchlistItems();
  if (!isLoggedIn) return /*#__PURE__*/React.createElement(LoginPopup, null, trigger);

  const close = () => {
    setWatchlistsToCopy(new Set());
    setAssetsToCopy(new Set());
    setEditing(false);
    setIsShown(false);
    window.dispatchEvent(new CustomEvent('panelVisibilityChange', {
      detail: 'show'
    }));
  };

  const open = () => {
    setIsShown(true);
    setAssetsToCopy(checkedAssets);
    window.dispatchEvent(new CustomEvent('panelVisibilityChange', {
      detail: 'hide'
    }));
  };

  const normalizeListItems = items => items ? items.map(({
    project: {
      id
    }
  }) => id) : [];

  const checkRemainingAssets = (listId, assets) => {
    const list = lists.find(({
      id
    }) => listId === id);
    const listItems = list ? list.listItems : [];
    const remainingAssets = [...assets].filter(id => {
      const assetInList = listItems.some(itemId => itemId === id);
      return !assetInList;
    });
    return remainingAssets;
  };

  let lists = watchlists.filter(({
    id
  }) => id !== currentId).sort(sortByAsDates('insertedAt')).reverse().map(_ref => {
    let {
      listItems
    } = _ref,
        rest = _objectWithoutProperties(_ref, _excluded);

    return _objectSpread(_objectSpread({}, rest), {}, {
      listItems: normalizeListItems(listItems)
    });
  });

  if (editableWatchlists.length !== editWatchlistState.length) {
    setEditWatchlistState(editableWatchlists);

    if (editableWatchlists.length === 0 && isShown) {
      setNotification({
        description: 'Copying completed successfully',
        title: 'Success',
        variant: 'success'
      });
      close();
    }
  }

  const checkEditingState = (assets, watchlists) => {
    if (assets.size === 0 || watchlists.size === 0) {
      if (isEditing) setEditing(false);
      if (warning) setWarning(false);
    } else if (assets.size > 0 && watchlists.size > 0) {
      const hasWatchlistWithoutSelectedAssets = [...watchlists].some(assetsListId => {
        const remainingAssets = checkRemainingAssets(assetsListId, assets);
        return remainingAssets.length > 0;
      });

      if (hasWatchlistWithoutSelectedAssets !== isEditing) {
        setEditing(hasWatchlistWithoutSelectedAssets);
      }

      if (!hasWatchlistWithoutSelectedAssets && !warning) setWarning(true);
      if (hasWatchlistWithoutSelectedAssets && warning) setWarning(false);
    }
  };

  const toggleItem = (list, id) => {
    const listCopy = new Set([...list]);
    if (listCopy.has(id)) listCopy.delete(id);else listCopy.add(id);
    return listCopy;
  };

  const onAssetClick = id => {
    const assets = toggleItem(assetsToCopy, id);
    setAssetsToCopy(assets);
    checkEditingState(assets, watchlistsToCopy);
  };

  const onWatchlistClick = ({
    id
  }) => {
    const watchlists = toggleItem(watchlistsToCopy, id);
    setWatchlistsToCopy(watchlists);
    checkEditingState(assetsToCopy, watchlists);
  };

  const applyChanges = () => {
    watchlistsToCopy.forEach(assetsListId => {
      const remainingAssets = checkRemainingAssets(assetsListId, assetsToCopy);

      if (remainingAssets.length > 0) {
        let listItems = [];

        if (type === BLOCKCHAIN_ADDRESS) {
          listItems = assets.filter(asset => remainingAssets.includes(asset.blockchainAddress.address)).map(({
            blockchainAddress
          }) => mapAddressToAPIType(blockchainAddress));
        } else {
          listItems = assets.filter(asset => remainingAssets.includes(asset.id)).map(({
            id
          }) => ({
            project_id: +id
          }));
        }

        addWatchlistItems({
          variables: {
            id: +assetsListId,
            listItems
          }
        }).then(() => {
          setNotification({
            description: 'Copying completed successfully',
            title: 'Success',
            variant: 'success'
          });
          close();
        });
      }
    });
  };

  return /*#__PURE__*/React.createElement(Dialog, {
    title: `Copy assets to watchlist${watchlistsToCopy.size > 1 ? 's' : ''}`,
    trigger: trigger,
    onOpen: open,
    onClose: close,
    open: isShown
  }, /*#__PURE__*/React.createElement(Dialog.ScrollContent, {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.assetsWrapper
  }, /*#__PURE__*/React.createElement(AssetsList, {
    items: assets,
    selectedItems: assetsToCopy,
    onToggleAsset: onAssetClick,
    classes: {
      list: styles.wrapperList,
      asset: styles.asset
    },
    withSearch: true,
    type: type
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.watchlistsWrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, "Choose watchlist below"), /*#__PURE__*/React.createElement(Watchlists, {
    onWatchlistClick: onWatchlistClick,
    className: styles.wrapperList,
    classes: {
      list: styles.watchlists
    },
    lists: lists,
    withNewButton: false,
    loading: isWatchlistsLoading
  }))), warning && /*#__PURE__*/React.createElement("div", {
    className: styles.warning
  }, "All selected watchlists already contained all selected assets"), /*#__PURE__*/React.createElement(Dialog.Actions, {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(Dialog.Approve, {
    disabled: editWatchlistState.length > 0 || !isEditing,
    isLoading: editWatchlistState.length > 0,
    onClick: applyChanges,
    className: styles.approve
  }, "Copy assets"), /*#__PURE__*/React.createElement(Dialog.Cancel, {
    onClick: close
  }, "Cancel")));
};

const mapStateToProps = state => ({
  watchlistUi: state.watchlistUi
});

const mapDispatchToProps = dispatch => ({
  sendChanges: ({
    assetsListId,
    listItems,
    currentId
  }) => dispatch({
    type: USER_EDIT_ASSETS_IN_LIST,
    payload: {
      assetsListId,
      listItems,
      currentId
    }
  }),
  setNotification: message => dispatch(showNotification(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistCopyPopup);