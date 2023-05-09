const _excluded = ["type"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo, useState, useEffect } from 'react';
import cx from 'classnames';
import isEqual from 'lodash.isequal';
import Icon from '@santiment-network/ui/Icon';
import Panel from '@santiment-network/ui/Panel';
import Button from '@santiment-network/ui/Button';
import Search from '@santiment-network/ui/Search';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import Category from './Category';
import ConfigsMenu from './Configs';
import { useTableConfig } from '../gql/queries';
import { useIsAuthor } from '../../../../gql/list/hooks';
import { useTheme } from '../../../../../../stores/ui/theme';
import { useCategories, useManipulateColumns } from '../hooks';
import { getShadowVars } from '../../../../../../utils/styles';
import { transformToServerType } from '../../../../gql/helpers';
import { useUpdateWatchlistTableConfig } from '../gql/mutations';
import styles from './index.module.css';

const Toggler = ({
  activeColumns,
  updateActiveColumnsKeys,
  watchlist,
  sorting,
  setOrderBy,
  type,
  flexible = true,
  rebuildColumns
}) => {
  const {
    isNightMode
  } = useTheme();
  const {
    isAuthor
  } = useIsAuthor(watchlist);
  const [open, setOpen] = useState(false);
  const [selectedConfigId, setSelectedConfigId] = useState(watchlist && watchlist.tableConfiguration && watchlist.tableConfiguration.id);
  const {
    categories,
    loading
  } = useCategories(type);
  const [currentSearch, setCurrentSearch] = useState('');
  const [openConfigsMenu, setOpenConfigsMenu] = useState(false);
  const {
    toggleColumn,
    reorderActiveKeys,
    activeKeys,
    setActiveKeys,
    currActiveKeys,
    setCurrActiveKeys,
    wasReorder,
    setWasReorder
  } = useManipulateColumns();
  const {
    updateWatchlistTableConfig,
    updatedWatchlistTableConfigId
  } = useUpdateWatchlistTableConfig();
  const {
    tableConfig,
    loading: configLoading
  } = useTableConfig(selectedConfigId);
  const isLoading = configLoading || loading;
  const savedActiveColumnKeys = useMemo(() => activeColumns.map(({
    key
  }) => key), [activeColumns]);
  const config = useMemo(() => {
    if (watchlist && watchlist.tableConfiguration && selectedConfigId === watchlist.tableConfiguration.id && !tableConfig) {
      return watchlist.tableConfiguration;
    } else {
      return tableConfig;
    }
  }, [watchlist, updatedWatchlistTableConfigId, selectedConfigId, tableConfig]);
  useEffect(() => {
    if (config && Object.keys(categories).length !== 0) {
      const {
        metrics,
        sorting
      } = config.columns;

      if (sorting) {
        setOrderBy(sorting);
      }

      setActiveKeys(metrics);
      setCurrActiveKeys(metrics);
      updateActiveColumnsKeys(metrics);
      rebuildColumns && rebuildColumns(prev => prev + 1);
    }
  }, [config, categories]);
  useEffect(() => {
    if (watchlist && watchlist.tableConfiguration && watchlist.tableConfiguration.id !== selectedConfigId) {
      setSelectedConfigId(watchlist.tableConfiguration.id);
    }
  }, [watchlist]);
  useEffect(() => {
    if (!isEqual(savedActiveColumnKeys, activeKeys) && !open && !isLoading) {
      setActiveKeys(savedActiveColumnKeys);
    }
  }, [savedActiveColumnKeys]);
  useEffect(() => {
    setCurrActiveKeys(activeKeys);

    if (!open && !isLoading) {
      if (activeKeys && hasChanges) {
        updateActiveColumnsKeys(activeKeys);
      }

      setWasReorder(false);
      setCurrentSearch('');
    }
  }, [open]);
  const hasChanges = useMemo(() => !isEqual(currActiveKeys, activeKeys) || wasReorder, [activeKeys, currActiveKeys, wasReorder]);
  useEffect(() => {
    if (selectedConfigId && (!watchlist.tableConfiguration || watchlist.tableConfiguration.id !== selectedConfigId) && isAuthor) {
      if (!updatedWatchlistTableConfigId || updatedWatchlistTableConfigId !== selectedConfigId) {
        updateWatchlistTableConfig(watchlist.id, selectedConfigId);
      }
    }
  }, [selectedConfigId]);

  if (loading && activeKeys === null) {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement(ContextMenu, {
    trigger: /*#__PURE__*/React.createElement(Button, {
      fluid: true,
      variant: "flat",
      className: cx(styles.button, styles.button__withLine)
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "columns"
    })),
    open: open,
    passOpenStateAs: "isActive",
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
    position: "bottom",
    align: "end",
    flexible: flexible
  }, /*#__PURE__*/React.createElement(Panel, {
    variant: "modal",
    className: cx(styles.wrapper, hasChanges && styles.wrapper__active),
    style: getShadowVars(isNightMode)
  }, /*#__PURE__*/React.createElement(Button, {
    className: cx(styles.discard, hasChanges && styles.discard__active),
    onClick: () => {
      setActiveKeys(savedActiveColumnKeys);
      setCurrActiveKeys(savedActiveColumnKeys);
      setOpen(false);
    }
  }, "Discard changes"), /*#__PURE__*/React.createElement(Search, {
    onChange: value => setCurrentSearch(value),
    placeholder: "Type to search",
    className: styles.search
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, /*#__PURE__*/React.createElement(Category, {
    key: "Active columns",
    title: "Active columns",
    columns: activeColumns,
    onColumnToggle: toggleColumn,
    activeKeys: currActiveKeys,
    currentSearch: currentSearch,
    reorder: reorderActiveKeys
  }), Object.keys(categories).map(key => /*#__PURE__*/React.createElement(Category, {
    currentSearch: currentSearch,
    key: key,
    title: key,
    groups: categories[key],
    onColumnToggle: toggleColumn,
    activeKeys: currActiveKeys
  }))))), /*#__PURE__*/React.createElement(ConfigsMenu, {
    type: type,
    setOpen: setOpenConfigsMenu,
    open: openConfigsMenu,
    changeConfig: setSelectedConfigId,
    config: config,
    sorting: sorting,
    isLoading: isLoading,
    savedActiveColumnKeys: savedActiveColumnKeys
  }));
};

export default (_ref => {
  let {
    type
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(Toggler, _extends({}, props, {
    type: transformToServerType(type)
  }));
});