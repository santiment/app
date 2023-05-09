import React from 'react';
import { withExternal } from './utils';
import FeesDistribution from '../../../ducks/Studio/FeesDistribution/FeesDistribution';
const Widget = withExternal(FeesDistribution);

const FeesDistributionWidget = ({
  widget,
  target,
  settings
}) => /*#__PURE__*/React.createElement(Widget, {
  target: target,
  settings: settings,
  deleteWidget: widget.deleteWithHistory || widget.delete
});

export default FeesDistributionWidget;