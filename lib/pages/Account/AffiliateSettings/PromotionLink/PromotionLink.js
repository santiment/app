import React from 'react';
import copy from 'copy-to-clipboard';
import Input from '@santiment-network/ui/Input';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import ShareMedias from '../../../../components/Share/medias/ShareMedias';
import styles from './PromotionLink.module.css';

const PromotionLink = ({
  data
}) => {
  const {
    referralLink
  } = data;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.copyBlock
  }, /*#__PURE__*/React.createElement(Input, {
    className: styles.linkInput,
    value: referralLink,
    disabled: true
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: () => copy(referralLink),
    className: styles.copyButton
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "copy",
    className: styles.copyIcon
  }))), /*#__PURE__*/React.createElement(ShareMedias, {
    shareLink: referralLink
  }));
};

export default PromotionLink;