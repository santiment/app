import React, { useState } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import { dateDifferenceInWords } from 'san-webkit/lib/utils/dates';
import { Activity, getTwitterAccount } from '../../../Index/Section/NftInfluencers/utils';
import Info from './Info/Info';
import styles from './Row.module.css';

const Row = ({
  data
}) => {
  const {
    datetime
  } = data;
  const [isOpened, setIsOpened] = useState(false);
  const when = dateDifferenceInWords(new Date(datetime));
  const account = getTwitterAccount(data);
  return /*#__PURE__*/React.createElement("div", {
    className: "fluid column"
  }, /*#__PURE__*/React.createElement("button", {
    className: cx(styles.row, 'row v-center justify body-2'),
    onClick: () => setIsOpened(!isOpened)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.influencer, 'row v-center')
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.icon, 'row hv-center', isOpened && styles.active)
  }, /*#__PURE__*/React.createElement(Icon, {
    type: isOpened ? 'arrow-down' : 'arrow-right'
  })), /*#__PURE__*/React.createElement("span", {
    className: cx(styles.account, 'single-line')
  }, account && `@${account.Name}`)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Activity, {
    onlyIcon: true,
    original: data
  })), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.when, 'txt-right')
  }, when)), /*#__PURE__*/React.createElement(Info, {
    data: data,
    isOpened: isOpened
  }));
};

export default Row;