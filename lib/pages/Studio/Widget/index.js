import React from 'react';
import { SelectorNode } from 'san-studio/lib/metrics/selector';
import { newExternalWidget } from './utils';
import ChartWidget from './Chart';
import FeesDistributionWidget from './FeesDistribution';
import HoldersDistributionTableWidget from './HoldersDistributionTable';
import TopExchangesTableWidget from './TopExchangesTable';
export const ExternalWidgetCreator = {
  [SelectorNode.FeesDistribution.key]: () => newExternalWidget(FeesDistributionWidget, {
    previewTitle: 'Fees Distribution'
  }),
  [SelectorNode.HoldersDistributionTable.key]: () => newExternalWidget(HoldersDistributionTableWidget, {
    previewTitle: 'Top Holders Table'
  }),
  [SelectorNode.TopExchangesTable.key]: () => newExternalWidget(TopExchangesTableWidget, {
    previewTitle: 'Holdings on the top exchanges'
  })
};
export function getExternalWidget(node) {
  const newWidget = ExternalWidgetCreator[node.key];
  if (newWidget) return newWidget();
}

const Widget = props => {
  const {
    widget
  } = props;

  if (widget.Widget === FeesDistributionWidget) {
    return /*#__PURE__*/React.createElement(FeesDistributionWidget, props);
  } else if (widget.Widget === HoldersDistributionTableWidget) {
    return /*#__PURE__*/React.createElement(HoldersDistributionTableWidget, props);
  } else if (widget.Widget === TopExchangesTableWidget) {
    return /*#__PURE__*/React.createElement(TopExchangesTableWidget, props);
  }

  return /*#__PURE__*/React.createElement(ChartWidget, props);
};

export default Widget;