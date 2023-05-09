import React from 'react';
import Button from '@santiment-network/ui/Button';
import { ProLabel } from '../../../../../../components/ProLabel';
import { useUserSubscriptionStatus } from '../../../../../../stores/user/subscriptions';
import MultilineText from '../../../../../../components/MultilineText/MultilineText';
import styles from './ReportCard.module.css';

const ReportCard = ({
  report: {
    name,
    description,
    url
  }
}) => {
  const {
    isPro
  } = useUserSubscriptionStatus();
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, name), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, /*#__PURE__*/React.createElement(MultilineText, {
    id: url,
    maxLines: 3,
    text: description
  }))), /*#__PURE__*/React.createElement(Button, {
    icon: "save",
    disabled: !isPro,
    href: url,
    rel: "noopener noreferrer",
    target: isPro ? '_blank' : '_self',
    as: 'a',
    className: styles.btn,
    classes: {
      btnIcon: !isPro && styles.disabled
    },
    border: true
  }, "Download", !isPro && /*#__PURE__*/React.createElement(ProLabel, {
    className: styles.proLabel
  })));
};

export default ReportCard;