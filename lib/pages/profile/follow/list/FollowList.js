const _excluded = ["username"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useMemo } from 'react';
import cx from 'classnames';
import withSizes from 'react-sizes';
import { Link } from 'react-router-dom';
import Search from '@santiment-network/ui/Search';
import Dialog from '@santiment-network/ui/Dialog';
import { mapSizesToProps } from '../../../../utils/withSizes';
import FollowBtn from '../FollowBtn';
import UserAvatar from '../../../Account/avatar/UserAvatar';
import { updateCurrentUserFollowQueryCache, useOldUserFollowersFollowing } from '../../../../queries/ProfileGQL';
import { useDialogState } from '../../../../hooks/dialog';
import PageLoader from '../../../../components/Loader/PageLoader';
import NotificationBellBtn from '../../../../components/NotificationBellBtn/NotificationBellBtn';
import styles from './FollowList.module.css';
const ARR = [];

const makeQueryVars = id => ({
  userId: +id
});

const FollowList = ({
  title,
  list: {
    users = ARR
  },
  currentUserId,
  isCurrentUser,
  trigger,
  isDesktop
}) => {
  const {
    isOpened,
    openDialog,
    closeDialog
  } = useDialogState();
  const {
    data: {
      following
    },
    loading
  } = useOldUserFollowersFollowing(makeQueryVars(currentUserId));
  return /*#__PURE__*/React.createElement(Dialog, {
    open: isOpened,
    onClose: closeDialog,
    onOpen: openDialog,
    title: title,
    classes: styles,
    trigger: trigger
  }, /*#__PURE__*/React.createElement(Dialog.ScrollContent, null, loading && /*#__PURE__*/React.createElement(PageLoader, {
    className: styles.loader
  }), !loading && isOpened && /*#__PURE__*/React.createElement(List, {
    users: users,
    following: following,
    currentUserId: currentUserId,
    isCurrentUser: isCurrentUser,
    isDesktop: isDesktop,
    onClickItem: closeDialog
  })));
};

const List = ({
  users = ARR,
  following,
  currentUserId,
  isCurrentUser,
  isDesktop,
  onClickItem
}) => {
  const [searchToken, setSearchToken] = useState();
  const [defaultUsers] = useState(users);
  const filteredUsers = useMemo(() => {
    return searchToken ? defaultUsers.filter(({
      username
    }) => username && username.indexOf(searchToken) !== -1) : defaultUsers;
  }, [searchToken, defaultUsers]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.listWrapper
  }, defaultUsers.length > 5 && /*#__PURE__*/React.createElement(Search, {
    className: styles.search,
    iconPosition: "left",
    placeholder: "Search a user",
    options: users.map(_ref => {
      let {
        username
      } = _ref,
          rest = _objectWithoutProperties(_ref, _excluded);

      return _objectSpread({
        label: username
      }, rest);
    }),
    onChange: val => setSearchToken(val)
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, filteredUsers.map(user => isCurrentUser && +user.id === +currentUserId ? null : /*#__PURE__*/React.createElement(FollowItem, {
    user: user,
    following: following,
    currentUserId: currentUserId,
    key: user.id,
    isDesktop: isDesktop,
    onClickItem: onClickItem
  }))));
};

const MAX_NAME_LENGTH = 22;

const getShortName = (username, isDesktop) => {
  if (isDesktop || username.length < MAX_NAME_LENGTH) {
    return username;
  }

  return username.slice(0, MAX_NAME_LENGTH) + '...';
};

const FollowItem = ({
  user: {
    id,
    username,
    avatarUrl
  },
  following = {
    users: ARR
  },
  currentUserId,
  isDesktop,
  onClickItem
}) => {
  const updateCache = (cache, queryData) => {
    const queryVariables = makeQueryVars(currentUserId);
    updateCurrentUserFollowQueryCache(cache, queryData, queryVariables, id, {
      id,
      avatarUrl,
      username,
      __typename: 'PublicUser'
    }, currentUserId);
  };

  const newUserName = username ? getShortName(username, isDesktop) : '';
  return /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.user,
    onClick: onClickItem
  }, /*#__PURE__*/React.createElement(UserAvatar, {
    userId: id,
    classes: styles,
    externalAvatarUrl: avatarUrl
  }), /*#__PURE__*/React.createElement(Link, {
    to: '/profile/' + id,
    className: cx(styles.name, !newUserName && styles.noName)
  }, newUserName || 'No name')), !!currentUserId && +id !== +currentUserId && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(NotificationBellBtn, {
    targetUserId: id,
    className: styles.bell
  }), /*#__PURE__*/React.createElement(FollowBtn, {
    className: styles.followBtn,
    userId: id,
    targetUserId: id,
    users: following.users,
    updateCache: updateCache,
    variant: isDesktop ? 'fill' : 'ghost'
  })));
};

export default withSizes(mapSizesToProps)(FollowList);