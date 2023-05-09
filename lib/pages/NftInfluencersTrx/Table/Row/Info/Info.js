import React, { useEffect, useRef } from 'react';
import cx from 'classnames';
import { copy } from 'san-webkit/lib/utils';
import { dateDifferenceInWords } from 'san-webkit/lib/utils/dates';
import Svg from 'san-webkit/lib/ui/Svg/react';
import { Activity, getTwitterAccount, Marketplace } from '../../../../Index/Section/NftInfluencers/utils';
import Section from './Section/Section';
import { capitalizeStr } from '../../../../../utils/utils';
import styles from './Info.module.css';

const Info = ({
  data,
  isOpened
}) => {
  const {
    nft,
    datetime,
    trxHash,
    amount,
    currencyProject,
    marketplace
  } = data;
  const account = getTwitterAccount(data);
  const when = dateDifferenceInWords(new Date(datetime));
  const clearTimerRef = useRef();
  useEffect(() => () => clearTimerRef.current && clearTimerRef.current(), []);

  function onCopyAddressClick(address, event) {
    if (clearTimerRef.current) clearTimerRef.current();
    const {
      currentTarget
    } = event;
    if (currentTarget) currentTarget.ariaLabel = 'Address copied';
    clearTimerRef.current = copy(address);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, 'fluid column justify', isOpened && styles.opened)
  }, /*#__PURE__*/React.createElement("div", {
    className: "row justify"
  }, /*#__PURE__*/React.createElement(Section, {
    title: "Twitter influencer"
  }, account && /*#__PURE__*/React.createElement("a", {
    href: account.Twitter,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "body-2 row v-center"
  }, "@", account.Name, /*#__PURE__*/React.createElement(Svg, {
    id: "external-link",
    w: 12,
    className: cx(styles.linkIcon, 'mrg-s mrg--l')
  }))), /*#__PURE__*/React.createElement(Section, {
    title: "Activity",
    className: "txt-right"
  }, /*#__PURE__*/React.createElement(Activity, {
    original: data
  }))), /*#__PURE__*/React.createElement("div", {
    className: "column"
  }, /*#__PURE__*/React.createElement(Section, {
    title: "Collection name"
  }, /*#__PURE__*/React.createElement("div", {
    className: "body-2 row v-center justify"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mrg-s mrg--r single-line"
  }, capitalizeStr(nft.name)), /*#__PURE__*/React.createElement("button", {
    className: cx(styles.address, 'btn expl-tooltip'),
    id: nft.contractAddress.toString(),
    "aria-label": "Copy address",
    onClick: event => onCopyAddressClick(nft.contractAddress, event)
  }, /*#__PURE__*/React.createElement("span", {
    className: "single-line"
  }, nft.contractAddress))))), /*#__PURE__*/React.createElement("div", {
    className: "row justify"
  }, /*#__PURE__*/React.createElement(Section, {
    title: "Trx hash"
  }, /*#__PURE__*/React.createElement("button", {
    className: cx(styles.address, 'btn body-2 expl-tooltip'),
    id: trxHash.toString(),
    "aria-label": "Copy address",
    onClick: event => onCopyAddressClick(trxHash, event)
  }, /*#__PURE__*/React.createElement("span", {
    className: "single-line"
  }, trxHash))), /*#__PURE__*/React.createElement(Section, {
    title: "When",
    className: "txt-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "body-2"
  }, when))), /*#__PURE__*/React.createElement("div", {
    className: "row justify"
  }, /*#__PURE__*/React.createElement(Section, {
    title: "Price"
  }, /*#__PURE__*/React.createElement("div", {
    className: "body-2"
  }, `${parseFloat(amount.toFixed(3))} ${currencyProject && currencyProject.ticker}`)), /*#__PURE__*/React.createElement(Section, {
    title: "Marketplace",
    className: "txt-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "body-2"
  }, /*#__PURE__*/React.createElement(Marketplace, {
    marketplace: marketplace
  })))));
};

export default Info;