import React from 'react';
import Icon from '@santiment-network/ui/Icon';
import DarkTooltip from '../../../../../../components/Tooltip/DarkTooltip';
import SaveAsAction from '../../../../../../ducks/Watchlists/Actions/SaveAs';
import tableStyles from '../../AssetsTable.module.css';
import styles from './Actions.module.css';

const SaveAs = ({
  selectedText,
  watchlist,
  widgets
}) => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SaveAsAction, {
    trigger: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DarkTooltip, {
      align: "center",
      position: "top",
      on: "hover",
      className: tableStyles.tooltip_oneline,
      trigger: /*#__PURE__*/React.createElement(Icon, {
        type: "watchlist-plus",
        className: styles.icon
      })
    }, "Save ", selectedText, " as watchlist")),
    type: watchlist.type,
    watchlist: watchlist,
    source: "save_items_as_new_watchlist",
    prefix: "Save as",
    infographics: widgets
  }));
};

export default SaveAs;