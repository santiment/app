import React, { useState, useMemo } from 'react';
import Button from '@santiment-network/ui/Button';
import Loader from '@santiment-network/ui/Loader/Loader';
import { useMetricExchanges, DEFAULT_EXCHANGE } from './hooks';
import Tabs, { Tab } from './Tabs';
import { useDropdown } from '../Dropdown';
import Setting from '../Setting';
import { mergeMetricSettingMap } from '../../../utils';
import styles from '../index.module.css';
const {
  CEX,
  DEX
} = Tab;

const ExchangeSetting = ({
  metric,
  widget,
  slug,
  rerenderWidgets
}) => {
  const {
    activeRef,
    close,
    Dropdown
  } = useDropdown();
  const [activeTab, setActiveTab] = useState(CEX);
  const {
    exchanges,
    loading
  } = useMetricExchanges(slug, activeTab === DEX);
  const owner = useMemo(() => {
    const settings = widget.MetricSettingMap.get(metric);
    return settings && settings.owner || DEFAULT_EXCHANGE;
  }, [widget.MetricSettingMap, metric]);

  function onChange(newOwner) {
    const newMap = new Map();
    const isExchangeRemoved = newOwner === DEFAULT_EXCHANGE; // NOTE: Inflow/Outflow requires queryKey change [@vanguard | Sep  2, 2020]

    newMap.set(metric, {
      queryKey: isExchangeRemoved ? undefined : metric.key + '_per_exchange',
      owner: isExchangeRemoved ? undefined : newOwner
    });
    widget.MetricSettingMap = mergeMetricSettingMap(widget.MetricSettingMap, newMap);
    close();
    rerenderWidgets();
  }

  return /*#__PURE__*/React.createElement(Dropdown, {
    trigger: /*#__PURE__*/React.createElement(Setting, null, "Exchange ", owner)
  }, /*#__PURE__*/React.createElement(Tabs, {
    activeTab: activeTab,
    setActiveTab: setActiveTab
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.exchanges
  }, exchanges && exchanges.map(exchange => /*#__PURE__*/React.createElement(Button, {
    key: exchange,
    variant: "ghost",
    className: styles.exchange,
    isActive: owner === exchange,
    onClick: () => onChange(exchange),
    forwardedRef: owner === exchange ? activeRef : undefined
  }, exchange))), loading && /*#__PURE__*/React.createElement(Loader, {
    className: styles.loader
  }));
};

export default ExchangeSetting;