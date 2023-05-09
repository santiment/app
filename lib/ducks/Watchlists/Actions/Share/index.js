function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import Button from '@santiment-network/ui/Button';
import Message from '@santiment-network/ui/Message';
import PublicityToggle from '../ChangeVisibility';
import Toggle from '../../../../components/VisibilityIndicator/Toggle';
import ShareModalTrigger from '../../../../components/Share/ShareModalTrigger';
import { useShortShareLink } from '../../../../components/Share/hooks';
import { checkIsScreener } from '../../../Screener/utils';
import { useUpdateWatchlist } from '../../gql/list/mutations';
import styles from './index.module.css';

const Share = ({
  watchlist,
  isAuthor,
  className,
  customLink,
  isMobile
}) => {
  const [isPublic, setIsPublic] = useState(watchlist.isPublic);
  const {
    shortShareLink,
    getShortShareLink
  } = useShortShareLink();
  const [updateWatchlist] = useUpdateWatchlist(watchlist.type);
  const type = checkIsScreener(watchlist) ? 'screener' : 'watchlist';
  useEffect(() => {
    if (isPublic !== watchlist.isPublic) {
      setIsPublic(watchlist.isPublic);
    }
  }, [watchlist.isPublic]);

  function handleToggleVisibility() {
    setIsPublic(!isPublic);
    updateWatchlist(watchlist, {
      isPublic: !isPublic
    });
  }

  return /*#__PURE__*/React.createElement(ShareModalTrigger, {
    classes: {
      title: cx(styles.shareTitle, isMobile && 'txt-m')
    },
    dialogTitle: isMobile ? 'Share' : `Share ${type}`,
    shareLink: customLink || shortShareLink,
    isDisabled: !isPublic,
    isMobile: isMobile,
    source: type,
    feature: type,
    trigger: props => /*#__PURE__*/React.createElement(React.Fragment, null, isMobile ? /*#__PURE__*/React.createElement("button", _extends({}, props, {
      className: cx(styles.trigger, 'mrg-xl mrg--r', className),
      onMouseDown: customLink ? undefined : getShortShareLink
    }), /*#__PURE__*/React.createElement(Icon, {
      type: "share",
      height: 19,
      width: 17
    })) : /*#__PURE__*/React.createElement(Button, _extends({}, props, {
      className: cx(styles.trigger, className),
      onMouseDown: customLink ? undefined : getShortShareLink,
      icon: "share"
    }), "Share"))
  }, isMobile ? /*#__PURE__*/React.createElement("div", {
    className: cx(styles.warningMessage, 'row mrg-m mrg--b', isPublic && styles.warningMessage__hide)
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Icon, {
    type: "alert",
    className: styles.warningMessageIcon
  })), /*#__PURE__*/React.createElement("span", {
    className: "mrg-s mrg--l"
  }, "Your watchlist is private. To able to share, please, switch it to \u201CPublic\u201D first")) : /*#__PURE__*/React.createElement("div", {
    className: cx(styles.messageWrapper, isPublic && styles.messageWrapper__hide)
  }, /*#__PURE__*/React.createElement(Message, {
    variant: "warn",
    className: styles.message
  }, "Your ", type, " is private. Please, switch it to \u201CPublic\u201D first.")), isAuthor && (isMobile ? /*#__PURE__*/React.createElement("div", {
    className: cx(styles.toggleWrapper, 'row v-center justify fluid mrg-xl mrg--b', !isMobile && styles.toggle)
  }, /*#__PURE__*/React.createElement("span", {
    className: "body-2"
  }, "Private watchlist"), /*#__PURE__*/React.createElement(Toggle, {
    isActive: isPublic,
    className: "relative",
    onClick: handleToggleVisibility
  })) : /*#__PURE__*/React.createElement(PublicityToggle, {
    variant: "flat",
    watchlist: watchlist,
    className: styles.toggle
  })));
};

export default Share;