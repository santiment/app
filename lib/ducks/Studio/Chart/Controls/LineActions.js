import React from 'react';
import Icon from '@santiment-network/ui/Icon';
import Button from './Button';
import styles from './index.module.css';

const LineActions = ({
  chartRef,
  selectedLineState
}) => {
  const [selectedLine, setSelectedLine] = selectedLineState;

  function onDelete() {
    const {
      drawer
    } = chartRef.current;
    drawer.selected = null;
    drawer.drawings = drawer.drawings.filter(drawing => drawing !== selectedLine);
    setSelectedLine();
    drawer.redraw();
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.divider
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: onDelete
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "remove-small",
    className: styles.icon
  })));
};

export default LineActions;