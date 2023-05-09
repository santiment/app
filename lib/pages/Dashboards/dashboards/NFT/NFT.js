import React from 'react';
import cx from 'classnames';
import Info from '../shared/Info/Info';
import Table from '../../../Index/Section/NftInfluencers/Table';
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport';
import dashboardsStyles from '../dashboards.module.css';

const NFT = () => /*#__PURE__*/React.createElement("section", {
  className: cx(dashboardsStyles.wrapper, 'column')
}, /*#__PURE__*/React.createElement(Info, {
  title: "NFT Influencers Trx",
  description: ""
}), /*#__PURE__*/React.createElement("main", {
  className: cx(dashboardsStyles.content, 'column')
}, /*#__PURE__*/React.createElement(Table, {
  isHome: false
})));

export default withRenderQueueProvider(NFT);