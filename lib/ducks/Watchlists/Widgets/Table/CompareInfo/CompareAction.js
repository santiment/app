import React from 'react';
import Button from '@santiment-network/ui/Button';
import DarkTooltip from '../../../../../components/Tooltip/DarkTooltip';
import CompareDialog from '../CompareDialog/CompareDialog';
import styles from '../AssetsTable.module.css';

const CompareTooltip = ({
  disabledComparision
}) => {
  return /*#__PURE__*/React.createElement(DarkTooltip, {
    align: "center",
    position: "bottom",
    on: "hover",
    className: styles.tooltip,
    trigger: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
      classes: {
        btnIcon: disabledComparision ? styles.compareIconDisabled : styles.compareIcon
      },
      icon: "compare",
      border: true,
      disabled: disabledComparision
    }, "Compare"))
  }, "Select at least 2 assets to be able to compare");
};

const CompareAction = ({
  assets,
  disabledComparision
}) => {
  if (disabledComparision) {
    return /*#__PURE__*/React.createElement(CompareTooltip, {
      disabledComparision: disabledComparision
    });
  }

  return /*#__PURE__*/React.createElement(CompareDialog, {
    assets: assets,
    trigger: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CompareTooltip, {
      disabledComparision: disabledComparision
    }))
  });
};

export default CompareAction;