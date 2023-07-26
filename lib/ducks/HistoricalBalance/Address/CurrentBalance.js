function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useMemo } from 'react';
import cx from 'classnames';
import { distributionSorter, CollapsedDistributions } from './AssetsDistribution';
import { useProjects, getProjectInfo } from '../../../stores/projects';
import { millify } from '../../../utils/formatting';
import styles from './CurrentBalance.module.css';
const MAX_DISTRIBUTIONS = 5;
const intlFormatter = new Intl.NumberFormat('en-EN', {
  style: 'currency',
  currency: 'USD'
});

const Distribution = ({
  ticker,
  balance
}) => ticker ? /*#__PURE__*/React.createElement("div", {
  className: styles.project
}, ticker, " ", balance) : null;

const Distributions = ({
  distributions
}) => distributions.map((distribution, i) => /*#__PURE__*/React.createElement(Distribution, _extends({
  key: i
}, distribution)));

export function useCurrentBalance(walletAssets) {
  const {
    projects
  } = useProjects();
  return useMemo(() => {
    if (projects.length === 0) return {
      distributions: []
    };
    const sortedAssets = (walletAssets || []).sort(distributionSorter);
    const {
      length
    } = sortedAssets;
    const distributions = new Array(length);
    let totalBalance = 0;

    for (let i = 0; i < length; i++) {
      totalBalance += sortedAssets[i].balanceUsd;
    }

    for (let i = 0; i < length; i++) {
      const {
        slug,
        balanceUsd
      } = sortedAssets[i];
      const {
        ticker
      } = getProjectInfo(projects, slug) || {};
      distributions[i] = {
        ticker,
        balance: '$' + millify(balanceUsd, balanceUsd < 1 ? 3 : 1)
      };
    }

    return {
      usd: intlFormatter.format(totalBalance),
      totalBalance,
      distributions
    };
  }, [projects, walletAssets]);
}

const CurrentBalance = ({
  walletAssets,
  className
}) => {
  const {
    usd,
    totalBalance,
    distributions
  } = useCurrentBalance(walletAssets);
  if (!totalBalance) return null;
  const hiddenProjects = distributions.slice(MAX_DISTRIBUTIONS);
  const biggestDistributions = distributions.slice(0, MAX_DISTRIBUTIONS + (hiddenProjects.length === 1));
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, "Current balance"), /*#__PURE__*/React.createElement("div", {
    className: styles.balance
  }, usd, " ", /*#__PURE__*/React.createElement("span", {
    className: styles.currency
  }, "USD")), /*#__PURE__*/React.createElement("div", {
    className: styles.projects
  }, /*#__PURE__*/React.createElement(Distributions, {
    distributions: biggestDistributions
  }), hiddenProjects.length > 1 && /*#__PURE__*/React.createElement(CollapsedDistributions, {
    distributions: hiddenProjects,
    Items: Distributions
  })));
};

export default CurrentBalance;
