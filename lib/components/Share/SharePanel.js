import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { trackShareFormOpen } from 'san-webkit/lib/analytics/events/interaction';
import Input from '@santiment-network/ui/Input';
import Dialog from '@santiment-network/ui/Dialog';
import ShareCopyBtn from './ShareCopyBtn';
import ShareMedias from './medias/ShareMedias';
import CopyLink from './CopyLink';
import styles from './SharePanel.module.css';

const SharePanel = ({
  shareTitle,
  shareText,
  shareLink,
  children,
  isDisabled,
  isAlert,
  isMobile,
  source,
  feature
}) => {
  useEffect(() => {
    trackShareFormOpen({
      source,
      feature
    });
  }, []);
  return /*#__PURE__*/React.createElement(Dialog.ScrollContent, null, /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, children, isMobile ? /*#__PURE__*/React.createElement(CopyLink, {
    link: shareLink,
    source: source,
    feature: feature
  }) : /*#__PURE__*/React.createElement("div", {
    className: styles.link
  }, /*#__PURE__*/React.createElement(Input, {
    className: styles.link__input,
    readOnly: true,
    disabled: isDisabled,
    defaultValue: shareLink
  }), /*#__PURE__*/React.createElement(ShareCopyBtn, {
    source: "share-form",
    feature: feature,
    shareLink: shareLink,
    disabled: isDisabled,
    isAlert: isAlert
  })), /*#__PURE__*/React.createElement(ShareMedias, {
    isMobile: isMobile,
    isDisabled: isDisabled,
    shareTitle: shareTitle,
    shareText: shareText,
    shareLink: shareLink,
    isAlert: isAlert
  })));
};

SharePanel.propTypes = {
  shareLink: PropTypes.string.isRequired,
  shareTitle: PropTypes.string,
  shareText: PropTypes.string
};
SharePanel.defaultProps = {
  shareTitle: 'Sanbase',
  shareText: 'Hey! Look what I have found at the app.santiment.net!'
};
export default SharePanel;