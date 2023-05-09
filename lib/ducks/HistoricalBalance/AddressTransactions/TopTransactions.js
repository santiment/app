function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import Icon from '@santiment-network/ui/Icon';
import Button from '@santiment-network/ui/Button';
import { COLUMNS } from './columns';
import { useTopTransactions } from '../hooks';
import Calendar from '../../Studio/Header/Calendar';
import { DEFAULT_SETTINGS, getItemKey } from './defaults';
import PagedTable, { buildPageSizes } from '../../_Table/Paged';
import { useDistributions } from '../Address/AssetsDistribution';
import ProjectIcon from '../../../components/ProjectIcon/ProjectIcon';
import { getProjectInfo, useProjects } from '../../../stores/projects';
import { DashboardProjectSelector } from '../../Stablecoins/StablecoinSelector/ProjectsSelectors';
import styles from './index.module.css';
const PAGE_SIZES = buildPageSizes([20, 50]);
const DEFAULT_SLUG = 'ethereum';

const TopTransactions = ({
  settings,
  walletAssets
}) => {
  const pagesItems = useRef([]).current;
  const projects = useProjects();
  const distributions = useDistributions(walletAssets);
  const [project, setProject] = useState(null);
  const [calendarSettings, setCalendarSettings] = useState(DEFAULT_SETTINGS);
  const [page, setPage] = useState(0);
  const {
    transactions,
    isLoading
  } = useTopTransactions(settings, page + 1, false, project, calendarSettings);
  const nextTransactions = useTopTransactions(settings, page + 2, isLoading || !project, project, calendarSettings).transactions;
  const items = useMemo(() => {
    pagesItems[page] = transactions;
    pagesItems[page + 1] = nextTransactions;
    return pagesItems.flat();
  }, [transactions, nextTransactions]);
  useEffect(() => {
    const slug = distributions[0] ? distributions[0].slug : DEFAULT_SLUG;
    setProject(getProjectInfo(projects, slug));
  }, [distributions, projects]);
  const onChangeProject = useCallback(project => setProject(project), [setProject]);
  const changeTimePeriod = useCallback((from, to) => setCalendarSettings({
    from,
    to
  }), []);
  const itemProps = useMemo(() => _objectSpread(_objectSpread({}, settings), {}, {
    asset: project
  }), [settings, project]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, /*#__PURE__*/React.createElement(Calendar, {
    settings: calendarSettings,
    changeTimePeriod: changeTimePeriod
  }), project && /*#__PURE__*/React.createElement(DashboardProjectSelector, {
    setAsset: onChangeProject,
    asset: project,
    trigger: /*#__PURE__*/React.createElement(Button, {
      border: true,
      className: styles.projectTrigger
    }, /*#__PURE__*/React.createElement(ProjectIcon, {
      className: styles.triggerIcon,
      size: 16,
      slug: project.slug,
      logoUrl: project.logoUrl,
      darkLogoUrl: project.darkLogoUrl
    }), project.ticker, /*#__PURE__*/React.createElement(Icon, {
      type: "arrow-down",
      className: styles.triggerArrow
    }))
  })), /*#__PURE__*/React.createElement(PagedTable, {
    className: styles.table,
    columns: COLUMNS,
    pageSizes: PAGE_SIZES,
    minRows: 10,
    items: items,
    itemProps: itemProps,
    isLoading: isLoading || projects.length === 0,
    onPageChange: setPage,
    getItemKey: getItemKey
  }));
};

export default TopTransactions;