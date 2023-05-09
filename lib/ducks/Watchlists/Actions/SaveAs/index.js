function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import EditForm from '../Edit/EditForm';
import { useUser } from '../../../../stores/user';
import { useDialogState } from '../../../../hooks/dialog';
import { useCreateWatchlist } from '../../gql/list/mutations';
import { getTitleByWatchlistType, SCREENER } from '../../detector';
import ProPopupWrapper from '../../../../components/ProPopup/Wrapper';
import LoginPopup from '../../../../components/banners/feature/PopupBanner';
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions';

const SaveAs = ({
  watchlist,
  trigger,
  type,
  prefix = 'Duplicate',
  open,
  customToggleOpen,
  source,
  infographics
}) => {
  const {
    isLoggedIn
  } = useUser();
  const title = getTitleByWatchlistType(type);
  const {
    isPro
  } = useUserSubscriptionStatus();
  const {
    name,
    description,
    listItems,
    function: fn
  } = watchlist;
  const [createWatchlist, {
    loading
  }] = useCreateWatchlist(type);
  const {
    closeDialog,
    isOpened,
    toggleOpen
  } = useDialogState(false);

  if (type === SCREENER && !isPro) {
    return /*#__PURE__*/React.createElement(ProPopupWrapper, {
      type: type
    }, trigger);
  }

  if (!isLoggedIn) {
    return /*#__PURE__*/React.createElement(LoginPopup, null, trigger);
  }

  function onSubmit(props) {
    createWatchlist(_objectSpread(_objectSpread({}, props), {}, {
      listItems: props.listItems || listItems,
      function: fn,
      openOnSuccess: true
    }), {
      source,
      infographics
    }).then(closeDialog);
  }

  return /*#__PURE__*/React.createElement(EditForm, {
    type: type,
    open: open || isOpened,
    trigger: trigger,
    isLoading: loading,
    toggleOpen: customToggleOpen ? customToggleOpen : toggleOpen,
    onFormSubmit: onSubmit,
    title: `${prefix} ${title}`,
    buttonLabel: prefix,
    settings: {
      name,
      description
    },
    watchlist: watchlist
  });
};

export default SaveAs;