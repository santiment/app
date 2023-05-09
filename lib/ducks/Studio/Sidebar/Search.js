const _excluded = ["categories", "project", "onChainDefault", "searchPredicate", "toggleMetric"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo } from 'react';
import { SearchWithSuggestions } from '@santiment-network/ui/Search';
const ON_CHAIN_DEFAULT = [];

const suggestionContent = ({
  label
}) => label;

const contains = (root, target) => root && root.toUpperCase().includes(target);

export function checkMatch(upperCaseSearchTerm, abbreviation, label) {
  if (!upperCaseSearchTerm) {
    return true;
  }

  return abbreviation && abbreviation.toUpperCase().includes(upperCaseSearchTerm) || label && label.toUpperCase().includes(upperCaseSearchTerm);
}

function predicate(searchTerm) {
  const upperCaseSearchTerm = searchTerm ? searchTerm.toUpperCase() : '';
  return ({
    label,
    abbreviation
  }) => contains(abbreviation, upperCaseSearchTerm) || contains(label, upperCaseSearchTerm);
}

export const getMetricSuggestions = (categories, predicate, props = {}, onChainDefault = ON_CHAIN_DEFAULT) => {
  const suggestions = [];

  for (const categoryKey in categories) {
    const category = categories[categoryKey];
    const items = categoryKey === 'On-chain' ? onChainDefault.slice() : [];

    for (const group in category) {
      category[group].forEach(({
        item,
        subitems
      }) => items.push(item, ...subitems));
    }

    suggestions.push({
      suggestionContent,
      predicate,
      title: categoryKey,
      items: items.filter(({
        checkIsVisible
      }) => checkIsVisible ? checkIsVisible(props) : true)
    });
  }

  return suggestions;
};

const Search = _ref => {
  let {
    categories,
    project,
    onChainDefault,
    searchPredicate,
    toggleMetric
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(SearchWithSuggestions, _extends({}, props, {
    withMoreSuggestions: false,
    data: useMemo(() => getMetricSuggestions(categories, searchPredicate, project, onChainDefault), [categories, searchPredicate, project, onChainDefault]),
    onSuggestionSelect: ({
      item
    }) => toggleMetric(item, project),
    dontResetStateAfterSelection: true
  }));
};

Search.defaultProps = {
  searchPredicate: predicate
};
export default Search;