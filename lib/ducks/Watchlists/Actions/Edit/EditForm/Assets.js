import React, { useState, useRef, useEffect } from 'react';
import cx from 'classnames';
import Label from '@santiment-network/ui/Label';
import Icon from '@santiment-network/ui/Icon';
import Input from '@santiment-network/ui/Input';
import Panel from '@santiment-network/ui/Panel';
import { Checkbox } from '@santiment-network/ui/Checkboxes/Checkboxes';
import { useTheme } from '../../../../../stores/ui/theme';
import { useOnClickOutside } from '../../../../../hooks/click';
import { useEditAssets } from './hooks';
import styles from './index.module.css';
import cardStyles from '../../../../../ducks/Watchlists/Widgets/Table/AssetCard.module.css';
import fieldStyles from '../../../../../ducks/Studio/Sidebar/ProjectSelector/index.module.css';
const VIEW_ITEM_COUNT = 4;

const Assets = ({
  watchlist,
  onChange,
  preSelectedItems
}) => {
  const ref = useRef();
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [filter, setFilter] = useState('');
  const {
    checkedItems,
    filteredWatchlist,
    toggleWatchlistProject,
    unusedProjects
  } = useEditAssets(filter.toLowerCase(), watchlist ? watchlist.listItems.map(l => l.project) : [], onChange, preSelectedItems);
  const {
    isNightMode
  } = useTheme();
  const [showItems, setShowItems] = useState(false);
  useEffect(() => {
    const showTimeout = setTimeout(() => setShowItems(true), 300);
    return () => clearTimeout(showTimeout);
  }, []);
  useOnClickOutside(ref, () => {
    setFilter('');
    setIsSearchMode(false);
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Label, {
    accent: "waterloo",
    className: styles.description__label
  }, "Assets"), /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: cx(fieldStyles.selector, styles.selector),
    onClick: () => {
      if (!isSearchMode) {
        setIsSearchMode(true);
        setFilter('');
      }
    }
  }, isSearchMode ? /*#__PURE__*/React.createElement(Input, {
    autoFocus: true,
    maxLength: "30",
    autoComplete: "off",
    placeholder: "Type to search",
    className: styles.searchInput,
    onChange: ({
      currentTarget: {
        value
      }
    }) => setFilter(value)
  }) : /*#__PURE__*/React.createElement(AssetItemDropdown, {
    checkedItems: checkedItems
  }), /*#__PURE__*/React.createElement(Icon, {
    onClick: () => {
      if (isSearchMode) {
        setFilter('');
        setIsSearchMode(false);
      }
    },
    type: "arrow-down",
    className: cx(fieldStyles.arrow, styles.arrow, isSearchMode && styles.arrowup)
  }), /*#__PURE__*/React.createElement(Panel, {
    className: cx(styles.panel, !isSearchMode && styles.hide)
  }, showItems && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h6", {
    className: styles.groupLabel
  }, "Contained in watchlist"), filteredWatchlist.map(item => {
    return /*#__PURE__*/React.createElement(AssetItem, {
      toggleWatchlistProject: toggleWatchlistProject,
      isActive: true,
      key: item.id,
      item: item,
      isNightMode: isNightMode
    });
  }), /*#__PURE__*/React.createElement("h6", {
    className: cx(styles.groupLabel, styles.groupLabel_mt)
  }, "Assets"), unusedProjects.map(item => {
    return /*#__PURE__*/React.createElement(AssetItem, {
      toggleWatchlistProject: toggleWatchlistProject,
      isActive: false,
      key: item.id,
      item: item,
      isNightMode: isNightMode
    });
  })))));
};

const AssetItemDropdown = ({
  checkedItems
}) => /*#__PURE__*/React.createElement(React.Fragment, null, checkedItems.length === 0 && /*#__PURE__*/React.createElement("span", {
  className: cx(cardStyles.ticker, styles.mlzero)
}, "Select asset for watchlist"), checkedItems.length > 0 && checkedItems.slice(0, VIEW_ITEM_COUNT).map((item, index) => {
  const hasDots = checkedItems.length > VIEW_ITEM_COUNT && index === VIEW_ITEM_COUNT - 1;
  const hasComma = index < VIEW_ITEM_COUNT - 1 && index < checkedItems.length - 1;
  const seprator = hasComma ? ', ' : hasDots ? '...' : '';
  return /*#__PURE__*/React.createElement("div", {
    className: cx(cardStyles.name, styles.mrhalf),
    key: item.id
  }, item.name, " ", /*#__PURE__*/React.createElement("span", {
    className: cx(cardStyles.ticker, styles.mlzero)
  }, item.ticker), ' ', seprator);
}));

const AssetItem = ({
  item,
  isNightMode,
  isActive,
  toggleWatchlistProject
}) => {
  const src = isNightMode && item.darkLogoUrl || item.logoUrl;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.assetItem,
    onClick: () => toggleWatchlistProject(item)
  }, /*#__PURE__*/React.createElement(Checkbox, {
    isActive: isActive
  }), ' ', /*#__PURE__*/React.createElement("img", {
    src: src,
    loading: "lazy",
    className: styles.logo,
    alt: item.name
  }), " ", item.name, ' ', /*#__PURE__*/React.createElement("span", {
    className: cx(cardStyles.ticker, 'mrg--l mrg-xs c-waterloo')
  }, item.ticker));
};

export default Assets;