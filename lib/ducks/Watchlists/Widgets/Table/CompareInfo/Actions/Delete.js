import React, { useState } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import DarkTooltip from '../../../../../../components/Tooltip/DarkTooltip';
import tableStyles from '../../AssetsTable.module.css';
import styles from './Actions.module.css';

const Delete = ({
  selected,
  onRemove,
  selectedText
}) => {
  const [loading, setLoading] = useState(false);

  function onClick() {
    if (loading) return;
    setLoading(true);
    onRemove(selected, () => setLoading(false));
  }

  return /*#__PURE__*/React.createElement(DarkTooltip, {
    align: "center",
    position: "top",
    on: "hover",
    className: tableStyles.tooltip_oneline,
    trigger: /*#__PURE__*/React.createElement("div", {
      onClick: onClick
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "remove",
      className: cx(styles.icon, styles.remove)
    }))
  }, "Delete ", selectedText, " from the watchlist");
};

export default Delete;