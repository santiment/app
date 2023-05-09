function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from 'react';
import { createSkeletonElement, createSkeletonProvider } from '@trainline/react-skeletor';
import { graphql } from 'react-apollo';
import withSizes from 'react-sizes';
import { compose } from 'recompose';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import { mapSizesToProps } from '../../utils/withSizes';
import Range from '../Watchlists/Widgets/WatchlistOverview/WatchlistAnomalies/Range';
import ChartSignalCreationDialog from './ChartSignalCreationDialog';
import PercentChanges from '../../components/PercentChanges';
import AddToWatchlist from '../Watchlists/Actions/Add';
import PriceChangesWidget from '../../components/PriceChangesWidget/PriceChangesWidget';
import ProjectIcon from '../../components/ProjectIcon/ProjectIcon';
import GetProjects from '../Signals/common/projects/getProjects';
import { TriggerProjectsSelector } from '../Signals/signalFormManager/signalCrudForm/formParts/projectsSelector/TriggerProjectsSelector';
import { formatNumber } from '../../utils/formatting';
import { PROJECT_BY_SLUG_QUERY } from './gql';
import ALL_PROJECTS from '../../allProjects.json';
import ProjectSelectDialog from '../Studio/Compare/ProjectSelectDialog';
import styles from './Header.module.css';
const H1 = createSkeletonElement('h1');
const ProjectInfo = createSkeletonProvider({
  name: '_______'
}, ({
  name
}) => name === undefined, () => ({
  color: 'var(--mystic)',
  backgroundColor: 'var(--mystic)'
}))(({
  name,
  ticker,
  slug,
  description,
  logoUrl,
  darkLogoUrl,
  onClick
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.selector,
  onClick: onClick
}, /*#__PURE__*/React.createElement(ProjectIcon, {
  size: 40,
  slug: slug,
  logoUrl: logoUrl,
  darkLogoUrl: darkLogoUrl
}), /*#__PURE__*/React.createElement("div", {
  className: styles.project
}, /*#__PURE__*/React.createElement("div", {
  className: styles.project__top
}, /*#__PURE__*/React.createElement(H1, {
  className: styles.project__name
}, name, " ", /*#__PURE__*/React.createElement("span", {
  className: styles.project__ticker
}, ticker)), /*#__PURE__*/React.createElement("div", {
  className: styles.project__arrows
}, /*#__PURE__*/React.createElement(Icon, {
  type: "arrow-down",
  className: styles.project__arrow
}))), /*#__PURE__*/React.createElement("div", {
  className: styles.project__description
}, description))));
export const ProjectSelector = ({
  slug,
  project,
  onChange,
  trigger = () => /*#__PURE__*/React.createElement(ProjectInfo, _extends({}, project, {
    slug: slug
  }))
}) => /*#__PURE__*/React.createElement(GetProjects, {
  render: ({
    allProjects,
    isLoading
  }) => {
    const array = allProjects && allProjects.length === 0 ? ALL_PROJECTS : allProjects;
    return /*#__PURE__*/React.createElement(TriggerProjectsSelector, {
      isLoading: isLoading,
      projects: array,
      target: {
        slug
      },
      isSingle: true,
      onChange: onChange,
      trigger: trigger
    });
  }
});

const PriceWithChanges = ({
  isTablet,
  isLaptop,
  percentChange24h,
  percentChange7d,
  priceUsd,
  ticker,
  slug,
  minmax,
  totalSupply
}) => {
  const RANGES = [{
    range: '24h',
    value: percentChange24h
  }, {
    range: '7d',
    value: percentChange7d
  }];
  let [activeRange, setActiveRange] = useState(0);

  const changeRange = () => {
    const nextRangeIndex = ++activeRange;
    setActiveRange(nextRangeIndex >= RANGES.length ? 0 : nextRangeIndex);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.projectInfo
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.column, styles.column__first)
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.text
  }, "Price"), /*#__PURE__*/React.createElement("div", {
    className: styles.usdWrapper
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.price
  }, priceUsd && formatNumber(priceUsd, {
    currency: 'USD'
  })), /*#__PURE__*/React.createElement("span", {
    className: styles.currency
  }, "USD")), (isTablet || isLaptop) && /*#__PURE__*/React.createElement(Range, {
    range: RANGES[activeRange].range,
    className: styles.range,
    changeRange: changeRange
  }, /*#__PURE__*/React.createElement(PercentChanges, {
    changes: RANGES[activeRange].value
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: styles.totalSupply
  }, formatNumber(totalSupply)), /*#__PURE__*/React.createElement("span", {
    className: styles.currency
  }, ticker))), !(isTablet || isLaptop) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.column
  }, /*#__PURE__*/React.createElement("span", {
    className: cx(styles.changesLabel, styles.changesLabel__first)
  }, RANGES[activeRange].range, " change"), /*#__PURE__*/React.createElement(PercentChanges, {
    changes: RANGES[activeRange].value,
    label: RANGES[activeRange].range
  })))), !isTablet && /*#__PURE__*/React.createElement(PriceChangesWidget, {
    className: styles.highLow,
    slug: slug,
    range: RANGES[activeRange].range,
    price: priceUsd,
    onRangeChange: changeRange,
    minmax: minmax
  }));
};

const Header = ({
  data: {
    project = {},
    minmax = {}
  } = {},
  slug,
  isLoggedIn,
  isLoading,
  onSlugSelect,
  isTablet,
  isLaptop,
  className
}) => {
  const [isOpened, setIsOpened] = useState();
  const [knockNumber, setKnockNumber] = useState(0);
  const dataProject = isLoading ? {} : project;
  const {
    id,
    ticker,
    totalSupply = 0,
    priceUsd = 0,
    percentChange24h = 0,
    percentChange7d = 0
  } = dataProject;
  useEffect(() => {
    if (onSlugSelect && project && project.ticker) {
      if (knockNumber > 0) {
        setKnockNumber(0);
      }

      onSlugSelect(_objectSpread({
        slug
      }, project));
    }
  }, [project]);

  function closeDialog() {
    setIsOpened(false);
  }

  function openDialog() {
    setIsOpened(true);
  }

  function onProjectSelect(project) {
    onSlugSelect(project);
    closeDialog();
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className)
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: styles.headerProject
  }, /*#__PURE__*/React.createElement(ProjectSelectDialog, {
    open: isOpened,
    activeSlug: slug,
    onOpen: openDialog,
    onClose: closeDialog,
    onSelect: onProjectSelect,
    trigger: /*#__PURE__*/React.createElement(ProjectInfo, _extends({}, project, {
      slug: slug,
      onClick: openDialog
    }))
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(AddToWatchlist, {
    trigger: /*#__PURE__*/React.createElement(Button, {
      border: true,
      className: styles.btn
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "add-watchlist",
      className: styles.btn__icon
    }), "Watch"),
    projectId: id,
    slug: slug,
    isLoggedIn: isLoggedIn
  }), /*#__PURE__*/React.createElement(ChartSignalCreationDialog, {
    slug: slug,
    trigger: /*#__PURE__*/React.createElement(Button, {
      border: true,
      className: cx(styles.btn, styles.signal)
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "signal",
      className: styles.btn__icon
    }), "Add alert")
  }))), /*#__PURE__*/React.createElement(PriceWithChanges, {
    isTablet: isTablet,
    isLaptop: isLaptop,
    totalSupply: totalSupply,
    percentChange7d: percentChange7d,
    percentChange24h: percentChange24h,
    ticker: ticker,
    priceUsd: priceUsd,
    minmax: minmax,
    slug: slug
  })));
};

export default compose(graphql(PROJECT_BY_SLUG_QUERY, {
  skip: ({
    slug
  }) => !slug,
  options: ({
    slug
  }) => ({
    variables: {
      slug
    }
  })
}), withSizes(mapSizesToProps))(Header);