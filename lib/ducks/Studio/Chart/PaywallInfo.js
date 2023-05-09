import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import Tooltip from '@santiment-network/ui/Tooltip';
import { getMetricBoundaries } from '../../dataHub/metrics/restrictions';
import { getDateFormats } from '../../../utils/dates';
import UpgradeBtn from '../../../components/UpgradeBtn/UpgradeBtn';
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions';
import styles from './PaywallInfo.module.css';

function formatDate(date) {
  const {
    DD,
    MMM,
    YY
  } = getDateFormats(new Date(date));
  return `${DD} ${MMM}, ${YY}`;
}

const DEFAULT_INFOS = [];

function useRestrictedInfo(metrics) {
  const [infos, setInfos] = useState(DEFAULT_INFOS);
  useEffect(() => {
    setInfos(DEFAULT_INFOS);
    let race = false;
    const infos = [];
    getMetricBoundaries().then(MetricsBoundaries => {
      if (race) return;
      metrics.forEach(({
        key,
        queryKey = key,
        label
      }, i) => {
        const metricBoundaries = MetricsBoundaries[queryKey];
        if (!metricBoundaries) return;
        const {
          restrictedFrom: from,
          restrictedTo: to
        } = metricBoundaries;

        if (from || to) {
          infos.push({
            label,
            boundaries: from && to ? `${formatDate(from)} - ${formatDate(to)}` : formatDate(from || to)
          });
        }
      });
      setInfos(infos);
    });
    return () => {
      race = true;
    };
  }, [metrics]);
  return infos;
}

const PaywallInfo = ({
  metrics,
  className
}) => {
  const infos = useRestrictedInfo(metrics);
  const {
    isPro,
    isTrial
  } = useUserSubscriptionStatus();

  if (isTrial) {
    return /*#__PURE__*/React.createElement(UpgradeBtn, {
      variant: "fill",
      fluid: true,
      className: cx(styles.upgrade_trial, className)
    });
  }

  if (isPro) return null;
  return infos.length > 0 ? /*#__PURE__*/React.createElement(Tooltip, {
    position: "bottom",
    trigger: /*#__PURE__*/React.createElement(Button, {
      className: cx(styles.btn, className)
    }, /*#__PURE__*/React.createElement(Icon, {
      className: styles.icon,
      type: "question-round-small"
    }), "Why the gaps?"),
    className: styles.tooltip
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, /*#__PURE__*/React.createElement("h2", {
    className: cx(styles.title, 'mrg-m mrg--b')
  }, "Why is some data hidden?"), /*#__PURE__*/React.createElement("p", {
    className: styles.text
  }, "Your plan has limited data period for:"), infos.map(({
    label,
    boundaries
  }) => /*#__PURE__*/React.createElement("p", {
    key: label,
    className: cx(styles.restriction, 'mrg-xs mrg--t')
  }, label, " (", boundaries, ")")), /*#__PURE__*/React.createElement("p", {
    className: cx(styles.text, 'mrg-l mrg--t mrg--b')
  }, "To unlock the full potential of Santiment metrics you need to upgrade your account to PRO"), /*#__PURE__*/React.createElement(UpgradeBtn, {
    variant: "fill",
    fluid: true,
    className: styles.upgrade
  }))) : null;
};

export default PaywallInfo;