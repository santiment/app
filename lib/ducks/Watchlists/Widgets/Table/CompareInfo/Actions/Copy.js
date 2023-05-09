import React from 'react';
import Icon from '@santiment-network/ui/Icon';
import DarkTooltip from '../../../../../../components/Tooltip/DarkTooltip';
import CopyAction from '../../../../../../ducks/Watchlists/Actions/Copy';
import tableStyles from '../../AssetsTable.module.css';
import styles from './Actions.module.css';

const Copy = ({
  selectedText,
  watchlist,
  assets,
  selected
}) => {
  const checkedAssetsMap = s => watchlist.type === 'BLOCKCHAIN_ADDRESS' ? s.address : s.id.toString();

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CopyAction, {
    trigger: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DarkTooltip, {
      align: "center",
      position: "top",
      on: "hover",
      className: tableStyles.tooltip_oneline,
      trigger: /*#__PURE__*/React.createElement(Icon, {
        type: "copy",
        className: styles.icon
      })
    }, "Copy ", selectedText, " to watchlist")),
    id: watchlist.id,
    type: watchlist.type,
    assets: assets,
    checkedAssets: new Set(selected.map(checkedAssetsMap))
  }));
};

export default Copy;