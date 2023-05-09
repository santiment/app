function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { shareWidget } from 'studio/sharing/widget';
import { WidgetToKeyMap } from './widgets';
import FeesDistribution from '../Widget/FeesDistribution';
import HoldersDistributionTable from '../Widget/HoldersDistributionTable';
import TopExchangesTable from '../Widget/TopExchangesTable';

function shareChartWidget(widget) {
  const shared = {};
  shared.widget = WidgetToKeyMap.get(widget.Widget);

  if (widget.Widget === FeesDistribution || widget.Widget === HoldersDistributionTable || widget.Widget === TopExchangesTable) {
    return shared;
  }

  return _extends(shared, shareWidget(widget));
}

export function shareWidgets(widgets) {
  return widgets.map(shareChartWidget);
}
export function shareSettings({
  slug,
  ticker,
  from,
  to,
  address
}) {
  return {
    slug,
    ticker,
    from,
    to,
    address
  };
}