function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useMemo } from 'react';
import cx from 'classnames';
import { CollapsedTooltip } from './Labels';
import { capitalizeStr } from '../../../utils/utils';
import { useProjects, getProjectInfo } from '../../../stores/projects';
import styles from './AssetsDistribution.module.css';
const NO_COLOR = '#D2D6E7';
const COLORS = ['#37D7BA', '#FF5BAA', '#FFCB47', '#D4E763', '#5275FF', '#efa7a7', '#8358ff', '#18c0e4'];
const MAX_COLOR_PROJECTS = COLORS.length;
const MAX_DESCRIBED_PROJECTS = 6;
export const distributionSorter = ({
  balanceUsd: a
}, {
  balanceUsd: b
}) => b - a;

const checkIsSmallDistribution = percent => percent < 0.5;

const smallDistributionFinder = ({
  percent
}) => checkIsSmallDistribution(percent);

export function useDistributions(walletAssets) {
  const {
    projects
  } = useProjects();
  return useMemo(() => {
    if (projects.length === 0) return [];
    const sortedAssets = walletAssets.sort(distributionSorter);
    const {
      length
    } = sortedAssets;
    const distributions = new Array(length);
    let totalBalance = 0;

    for (let i = 0; i < length; i++) {
      totalBalance += sortedAssets[i].balanceUsd;
    }

    const scale = 100 / totalBalance;

    for (let i = 0; i < length; i++) {
      const {
        slug,
        balanceUsd
      } = sortedAssets[i];
      const {
        ticker
      } = getProjectInfo(projects, slug) || {};
      const percent = balanceUsd * scale;
      distributions[i] = {
        percent,
        slug,
        name: ticker || capitalizeStr(slug),
        percentText: percent > 0.1 ? percent.toFixed(1) + '%' : '0.0%',
        style: {
          '--width': percent + '%',
          '--color': checkIsSmallDistribution(percent) ? NO_COLOR : COLORS[i] || NO_COLOR
        }
      };
    }

    return distributions;
  }, [projects, walletAssets]);
}

const Distribution = ({
  name,
  style,
  percentText
}) => /*#__PURE__*/React.createElement("div", {
  style: style,
  className: styles.project
}, name, " ", /*#__PURE__*/React.createElement("span", {
  className: styles.percent
}, percentText));

const Distributions = ({
  distributions
}) => distributions.map((distribution, i) => /*#__PURE__*/React.createElement(Distribution, _extends({
  key: i
}, distribution)));

export const CollapsedDistributions = ({
  distributions,
  Items = Distributions
}) => /*#__PURE__*/React.createElement(CollapsedTooltip, {
  trigger: /*#__PURE__*/React.createElement("div", {
    className: styles.collapsed
  }, `+${distributions.length} assets`)
}, /*#__PURE__*/React.createElement(Items, {
  distributions: distributions
}));

const AssetsDistribution = ({
  walletAssets,
  skipTitle,
  className,
  classes
}) => {
  const distributions = useDistributions(walletAssets);
  const biggestDistributions = useMemo(() => {
    const index = distributions.findIndex(smallDistributionFinder);
    return index === -1 ? distributions : distributions.slice(0, index);
  }, [distributions]);
  if (distributions.length === 0) return null;
  const historgramProjects = biggestDistributions.slice(0, MAX_COLOR_PROJECTS);
  const hiddenProjects = distributions.slice(MAX_DESCRIBED_PROJECTS);
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className)
  }, !skipTitle && /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, "Assets USD distribution"), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.historgram, classes && classes.histogramClassName)
  }, historgramProjects.map(({
    name,
    style
  }) => /*#__PURE__*/React.createElement("div", {
    key: name,
    style: style,
    className: styles.slice
  })), historgramProjects.length < biggestDistributions.length && /*#__PURE__*/React.createElement("div", {
    className: cx(styles.slice, styles.slice_other)
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.projects
  }, /*#__PURE__*/React.createElement(Distributions, {
    distributions: distributions.slice(0, MAX_DESCRIBED_PROJECTS)
  }), hiddenProjects.length !== 0 && /*#__PURE__*/React.createElement(CollapsedDistributions, {
    distributions: hiddenProjects
  })));
};

export default AssetsDistribution;