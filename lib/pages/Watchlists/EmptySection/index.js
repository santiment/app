import React from 'react';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import NewWatchlist from '../../../ducks/Watchlists/Actions/New';
import EditAddresses from '../../../ducks/Watchlists/Actions/Edit/EditAddresses/EditAddresses';
import Section from '../../../components/EmptySection/EmptySection';
import { DesktopOnly } from '../../../components/Responsive';
import { PROJECT, BLOCKCHAIN_ADDRESS } from '../../../ducks/Watchlists/detector';
import { mapAddressToAPIType } from '../../../ducks/Watchlists/utils';
import styles from './index.module.css';

const CTAButton = ({
  type = PROJECT,
  onClick
}) => /*#__PURE__*/React.createElement(Button, {
  variant: "fill",
  accent: "positive",
  className: styles.emptyBtn,
  onClick: onClick
}, type === PROJECT ? 'Create watchlist' : 'Add addresses');

export const EmptySection = ({
  className,
  wrapperClassName,
  type = PROJECT,
  watchlist,
  refreshList
}) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, {
  className: cx(styles.empty__row, wrapperClassName),
  imgClassName: cx(styles.img, className)
}, /*#__PURE__*/React.createElement("div", {
  className: cx(styles.empty__text, 'body-2')
}, type === PROJECT ? /*#__PURE__*/React.createElement("span", null, "Create your own watchlist to track ", /*#__PURE__*/React.createElement("br", null), " assets you are interested in") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "Start to add addresses you want to track"), /*#__PURE__*/React.createElement("span", null, "or just interested in")), /*#__PURE__*/React.createElement(DesktopOnly, null, type === PROJECT ? /*#__PURE__*/React.createElement(NewWatchlist, {
  trigger: /*#__PURE__*/React.createElement(CTAButton, null),
  type: type,
  source: "create_watchlist"
}) : /*#__PURE__*/React.createElement(EditAddresses, {
  watchlist: watchlist,
  refreshList: refreshList,
  mapAddressToAPIType: mapAddressToAPIType,
  trigger: /*#__PURE__*/React.createElement(CTAButton, {
    type: BLOCKCHAIN_ADDRESS
  })
})))));
export default EmptySection;