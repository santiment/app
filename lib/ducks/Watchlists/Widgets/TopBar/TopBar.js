const _excluded = ["entity", "type", "refetchAssets", "widgets", "setWidgets", "isDefaultScreener", "projectsCount", "updateWatchlistFunction"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useLocation } from 'react-router-dom';
import toReact from 'svelte-adapter/react';
import Icon from '@santiment-network/ui/Icon';
import CreationInfoComponent from './CreationInfoWrapper.svelte';
import CommentsComponent from 'webkit/ui/Comments/svelte';
import { CreationType } from 'webkit/ui/Profile/types';
import { CommentsType } from 'webkit/api/comments';
import { lookupSavedComment, clearSavedComment } from 'webkit/ui/Comments/utils';
import { track } from 'webkit/analytics';
import BaseActions from '../TopPanel/BaseActions';
import SaveAs from '../../../../ducks/Watchlists/Actions/SaveAs';
import EditForm from '../../Actions/Edit/EditForm';
import Widgets from '../TopPanel/Widgets';
import ScreenerSignalDialog from '../../../Signals/ScreenerSignal/ScreenerSignalDialog';
import Share from '../../Actions/Share';
import WeeklyReport from '../../Actions/WeeklyReport';
import Filter from '../Filter';
import { usePublicUserData } from '../../../../pages/profile/ProfilePage';
import { useUser } from '../../../../stores/user';
import { BLOCKCHAIN_ADDRESS, getTitleByWatchlistType, PROJECT, SCREENER } from '../../detector';
import { useIsAuthor } from '../../gql/list/hooks';
import { onAnonComment, onCommentError } from '../../../../pages/Studio/utils';
import { useUpdateWatchlist } from '../../gql/list/mutations';
import { notifyUpdate } from './notifications';
import { mutateStoreUserActivity, InteractionType } from '../../../../queries/userActivity';
import styles from './TopBar.module.css';
export const CreationInfo = toReact(CreationInfoComponent, {
  display: 'flex',
  alignItems: 'center'
}, 'div');
export const Comments = toReact(CommentsComponent, {
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
}, 'div');

const TopBar = _ref => {
  let {
    entity,
    type,
    refetchAssets,
    widgets,
    setWidgets,
    isDefaultScreener,
    projectsCount,
    updateWatchlistFunction
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const {
    user: currentUser,
    isLoggedIn
  } = useUser();
  const {
    user,
    name: title,
    id,
    description,
    commentsCount,
    votes,
    isPublic
  } = entity;
  const {
    data = {}
  } = usePublicUserData({
    userId: user && user.id
  });
  const {
    isAuthor,
    isAuthorLoading
  } = useIsAuthor(entity);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [updateWatchlist, {
    loading
  }] = useUpdateWatchlist(type);
  const [isEditFormOpened, setIsEditFormOpened] = useState(false);
  const {
    state
  } = useLocation();
  useEffect(() => {
    if (state && state.openComments) {
      setIsCommentsOpen(true);
      closeFilter();
    }
  }, [state]);
  useEffect(() => {
    if (isLoggedIn) {
      const comment = lookupSavedComment();

      if (comment) {
        setIsCommentsOpen(true);
      }
    }
  }, [id]);

  function onVote() {
    mutateStoreUserActivity(type, id, InteractionType.UPVOTE);
    track.event('watchlist_like', {
      id
    });
  }

  function closeFilter() {
    if (isFilterOpen) {
      setIsFilterOpen(false);
    }
  }

  function handleSavedWatchlistComment() {
    const node = document.querySelector(`textarea[name="comment"]`);

    if (node) {
      const comment = lookupSavedComment();

      if (comment) {
        node.value = comment.content;
        clearSavedComment();
      }
    }
  }

  const onEditApprove = props => updateWatchlist(entity, _objectSpread({}, props)).then(() => {
    setIsEditFormOpened(false);
    notifyUpdate(title);

    if (refetchAssets) {
      refetchAssets();
    }
  });

  const isCurrentUser = data && currentUser && data.id === currentUser.id;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.info
  }, /*#__PURE__*/React.createElement(CreationInfo, {
    id: id,
    type: type === BLOCKCHAIN_ADDRESS ? CreationType.AddressWatchlist : CreationType.Watchlist,
    source: getTitleByWatchlistType(type),
    title: title,
    user: data,
    editLabel: isCurrentUser ? 'Edit' : 'Save as',
    currentUser: currentUser,
    onEditClick: () => setIsEditFormOpened(prev => !prev),
    comments: {
      count: commentsCount,
      active: isCommentsOpen,
      onClick: () => {
        setIsCommentsOpen(prev => !prev);
        closeFilter();
      }
    },
    votes: votes,
    onVote: onVote,
    description: description,
    titleHoverTooltipClass: styles.titleHoverTooltip
  }), isCurrentUser ? /*#__PURE__*/React.createElement(EditForm, {
    type: type,
    open: isEditFormOpened,
    id: entity.id,
    watchlist: entity,
    isLoading: loading,
    toggleOpen: setIsEditFormOpened,
    title: 'Edit ' + title,
    settings: {
      name: title,
      description,
      isPublic
    },
    onFormSubmit: payload => onEditApprove(payload).then(() => setIsEditFormOpened(false))
  }) : /*#__PURE__*/React.createElement(SaveAs, {
    watchlist: entity,
    type: type,
    open: isEditFormOpened,
    customToggleOpen: setIsEditFormOpened
  }), !isLoggedIn && type === SCREENER ? null : /*#__PURE__*/React.createElement("div", {
    className: cx(styles.commentsWrapper, isCommentsOpen && styles.active)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.closeWrapper, 'btn row v-center border'),
    onClick: () => setIsCommentsOpen(false)
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "sidebar",
    className: styles.closeIcon
  })), entity && entity.user && /*#__PURE__*/React.createElement(Comments, {
    type: type === BLOCKCHAIN_ADDRESS ? CommentsType.Address : CommentsType.Watchlist,
    commentsFor: _objectSpread(_objectSpread({}, entity), {}, {
      id: +entity.id
    }),
    currentUser: currentUser,
    onAnonComment: onAnonComment,
    onCommentsLoaded: handleSavedWatchlistComment,
    onCommentError: onCommentError,
    onCommentSubmitted: () => mutateStoreUserActivity(type, id, 'COMMENT')
  })), isCommentsOpen && /*#__PURE__*/React.createElement("div", {
    className: styles.background,
    onClick: () => setIsCommentsOpen(false)
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(BaseActions, {
    type: type,
    watchlist: entity,
    onClick: closeFilter,
    widgets: widgets,
    isAuthor: isAuthor,
    isAuthorLoading: isAuthorLoading,
    refetchAssets: refetchAssets
  }), widgets && type !== BLOCKCHAIN_ADDRESS && /*#__PURE__*/React.createElement(Widgets, {
    widgets: widgets,
    setWidgets: setWidgets
  }), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.rightDivider, isDefaultScreener && styles.defaultDivider)
  }), /*#__PURE__*/React.createElement(Share, {
    watchlist: entity,
    isAuthor: isAuthor
  }), (isAuthor || isDefaultScreener) && /*#__PURE__*/React.createElement(ScreenerSignalDialog, {
    watchlistId: entity.id,
    type: type
  }), isAuthor && type === PROJECT && /*#__PURE__*/React.createElement(WeeklyReport, {
    watchlist: entity
  }), type === SCREENER && /*#__PURE__*/React.createElement(Filter, _extends({
    entityId: id,
    watchlist: entity,
    projectsCount: projectsCount,
    isAuthor: isAuthor,
    isAuthorLoading: isAuthorLoading,
    isLoggedIn: isLoggedIn,
    isDefaultScreener: isDefaultScreener,
    setIsOpen: flag => {
      setIsFilterOpen(flag);
      setIsCommentsOpen(false);
    },
    isOpen: isFilterOpen,
    updateWatchlistFunction: updateWatchlistFunction,
    closeClasses: {
      wrapper: styles.closeWrapper,
      icon: styles.closeIcon
    }
  }, props))));
};

export default TopBar;