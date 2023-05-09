const _excluded = ["searchTerm"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useEffect, useMemo, useState } from 'react';
import { queryAllProjects } from 'san-studio/lib/api/project';
import Category from './Category';
import { filterSearchableItems } from './utils';
import styles from './Category.module.css';

function assetsFilterPredicate(value) {
  const searchTerm = value.toLowerCase();
  return ({
    name,
    ticker,
    slug
  }) => name.includes(searchTerm) || ticker.includes(searchTerm) || slug.includes(searchTerm);
}

function assetsMatchPredicate(value) {
  const searchTerm = value.toLowerCase();
  return ({
    ticker
  }) => ticker === searchTerm;
}

const useSearchableAssets = assets => useMemo(() => {
  const {
    length
  } = assets;
  const searchableAssets = new Array(length);

  for (let i = 0; i < length; i++) {
    const {
      name,
      ticker,
      slug
    } = assets[i];
    searchableAssets[i] = {
      name: name.toLowerCase(),
      ticker: ticker.toLowerCase(),
      slug: slug.toLowerCase()
    };
  }

  return searchableAssets;
}, [assets]);

export const propsAccessor = ({
  slug
}) => ({
  key: slug,
  to: '/charts?slug=' + slug
});
export const Asset = ({
  name,
  ticker
}) => /*#__PURE__*/React.createElement("span", null, name, " ", /*#__PURE__*/React.createElement("span", {
  className: styles.ticker
}, ticker));

function useProjects() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    queryAllProjects().then(setProjects);
  }, []);
  return projects;
}

const AssetsCategory = _ref => {
  let {
    searchTerm
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const assets = useProjects();
  const searchableAssets = useSearchableAssets(assets);
  const suggestions = useMemo(() => {
    if (!searchTerm) {
      return assets.slice(0, 5);
    }

    const {
      filteredItems,
      filteredSearchables
    } = filterSearchableItems(assetsFilterPredicate(searchTerm), searchableAssets, assets);
    const displayedItems = filteredItems.slice(0, 5);
    const matchedIndex = filteredSearchables.findIndex(assetsMatchPredicate(searchTerm));

    if (matchedIndex === -1) {
      return displayedItems;
    }

    const matchedAsset = filteredItems[matchedIndex];
    const displayedSet = new Set(displayedItems);

    if (displayedSet.has(matchedAsset)) {
      displayedSet.delete(matchedAsset);
    }

    return [matchedAsset, ...displayedSet].slice(0, 5);
  }, [searchTerm, searchableAssets]);
  return suggestions.length ? /*#__PURE__*/React.createElement(Category, _extends({}, props, {
    className: styles.category_assets,
    title: "Assets",
    items: suggestions,
    Item: Asset,
    propsAccessor: propsAccessor
  })) : null;
};

export default AssetsCategory;