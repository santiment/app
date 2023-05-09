function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Panel from '@santiment-network/ui/Panel/Panel';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import { notifyUpdate } from '../notifications';
import SaveAsAction from '../../../Actions/SaveAs';
import { useUserWatchlists } from '../../../gql/lists/hooks';
import { useUpdateWatchlist } from '../../../gql/list/mutations';
import { getTitleByWatchlistType, SCREENER } from '../../../detector';
import { Delete, New, SaveAs, Edit, NonAuthorTrigger, Trigger, Copy } from './Items';
import styles from './index.module.css';

const Actions = ({
  watchlist,
  type,
  onClick,
  isAuthor,
  isAuthorLoading,
  refetchAssets,
  widgets
}) => {
  const [lists] = useUserWatchlists(type);
  const [updateWatchlist, {
    loading
  }] = useUpdateWatchlist(type);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [showPanel, setShowPanel] = useState(true);
  useEffect(() => {
    const panelVisibilityChange = ({
      detail
    }) => {
      const isShowPanel = detail === 'show';
      if (!isShowPanel) setShowPanel(isShowPanel);
      setIsMenuOpened(!isShowPanel);
    };

    window.addEventListener('panelVisibilityChange', panelVisibilityChange, false);
    return () => window.removeEventListener('panelVisibilityChange', panelVisibilityChange, false);
  }, []);

  if (!watchlist.id && type !== SCREENER || isAuthorLoading) {
    return null;
  }

  if (!isAuthor) {
    return /*#__PURE__*/React.createElement("div", {
      onClick: onClick,
      className: styles.container
    }, /*#__PURE__*/React.createElement(SaveAsAction, {
      type: type,
      watchlist: watchlist,
      trigger: /*#__PURE__*/React.createElement(NonAuthorTrigger, null)
    }));
  }

  const {
    id,
    name
  } = watchlist;
  const title = getTitleByWatchlistType(type);
  const showDelete = isAuthor && (type !== SCREENER || lists.length > 1);

  const onEditApprove = props => updateWatchlist(watchlist, _objectSpread({}, props)).then(() => {
    setIsMenuOpened(false);
    notifyUpdate(title);
    refetchAssets && refetchAssets();
  });

  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick
  }, /*#__PURE__*/React.createElement(ContextMenu, {
    trigger: /*#__PURE__*/React.createElement(Trigger, {
      type: type,
      title: title,
      isLoading: loading,
      watchlist: watchlist,
      widgets: widgets,
      onPrimaryAction: onEditApprove,
      openMenu: () => {
        setShowPanel(true);
        setIsMenuOpened(true);
      }
    }),
    align: "start",
    position: "bottom",
    open: isMenuOpened,
    passOpenStateAs: "isActive",
    onClose: () => setIsMenuOpened(false)
  }, /*#__PURE__*/React.createElement(Panel, {
    variant: "modal",
    className: showPanel ? styles.wrapper : styles.hidePanel
  }, /*#__PURE__*/React.createElement(New, {
    type: type,
    widgets: widgets,
    source: "new_in_context_menu"
  }), /*#__PURE__*/React.createElement(SaveAs, {
    type: type,
    watchlist: watchlist,
    widgets: widgets
  }), ['SCREENER', 'PROJECT'].includes(type) && /*#__PURE__*/React.createElement(Copy, {
    watchlist: watchlist
  }), /*#__PURE__*/React.createElement(Edit, {
    type: type,
    title: title,
    watchlist: watchlist,
    isLoading: loading,
    onSubmit: onEditApprove
  }), showDelete && /*#__PURE__*/React.createElement(Delete, {
    id: id,
    name: name,
    title: title
  }))));
};

Actions.propTypes = {
  onClick: PropTypes.func,
  isAuthor: PropTypes.bool.isRequired,
  isAuthorLoading: PropTypes.bool.isRequired
};
Actions.defaultProps = {
  watchlist: {},
  onClick: _ => _
};
export default Actions;