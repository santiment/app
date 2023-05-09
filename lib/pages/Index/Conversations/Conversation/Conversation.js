import React from 'react';
import cx from 'classnames';
import { getSEOLinkFromIdAndTitle } from 'san-webkit/lib/utils/url';
import { markdownToPlainText } from 'san-webkit/lib/ui/Editor/markdown';
import SignalCreator from '../../../../components/SignalCard/card/creator/SignalCreator';
import TransactionTableLabels from '../../../../components/WalletLink/TransactionTableLabels';
import { EtherscanLink } from '../../../../components/WalletLink/ActionLabels';
import { makeLinkToInsight } from '../../../../utils/url';
import styles from './Conversation.module.css';
const LINK_SETTINGS = {
  linkSymbolsCount: 32
};

const getLink = data => {
  const {
    insight,
    blockchainAddress,
    chartConfiguration
  } = data;

  if (chartConfiguration) {
    const {
      id,
      title
    } = chartConfiguration;
    return `/charts/${getSEOLinkFromIdAndTitle(id, title)}?comment=${data.id}`;
  }

  if (insight) {
    return `${makeLinkToInsight(insight.id, insight.title)}#comments`;
  }

  if (blockchainAddress && blockchainAddress.address) {
    return `/labs/balance?address=${blockchainAddress.address}`;
  }

  return undefined;
};

const makeReadable = text => text.length > 80 ? `${text.slice(0, 80)} ...` : text;

const Conversation = ({
  data,
  classname
}) => {
  const {
    content,
    insight,
    timelineEvent,
    blockchainAddress,
    user
  } = data;
  const {
    chartConfiguration
  } = data;
  const link = getLink(data);

  function openConversation() {
    if (link) {
      window.open(link, '_blank');
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.container, link && styles.clickable, classname),
    onClick: openConversation
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, /*#__PURE__*/React.createElement(SignalCreator, {
    user: user,
    classes: styles
  }), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.type, insight && styles.insight, (chartConfiguration || blockchainAddress) && styles.balance, timelineEvent && styles.timeline)
  }, insight && 'Insights', blockchainAddress && 'Historical balance', timelineEvent && 'Event', chartConfiguration && 'Charts')), timelineEvent && /*#__PURE__*/React.createElement(Content, {
    content: content
  }), (insight || chartConfiguration) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Content, {
    content: content
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.insightTitle
  }, (insight || chartConfiguration).title)), blockchainAddress && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Content, {
    content: content
  }), /*#__PURE__*/React.createElement(EtherscanLink, {
    address: blockchainAddress.address,
    className: cx(styles.link, styles.link__address),
    settings: LINK_SETTINGS
  }), blockchainAddress.labels && /*#__PURE__*/React.createElement(TransactionTableLabels, {
    labels: blockchainAddress.labels,
    className: styles.labels
  })), !blockchainAddress && !insight && !timelineEvent && !chartConfiguration && content && /*#__PURE__*/React.createElement(Content, {
    content: content
  }));
};

const Content = ({
  content
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.content
}, makeReadable(markdownToPlainText(content)));

export default Conversation;