const _excluded = ["className", "toggleMetric", "activeMetrics", "activeEvents", "disabledMetrics", "isMobile", "hiddenMetrics", "categories", "loading", "showLimitMessage", "onSave"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import cx from 'classnames';
import { graphql } from 'react-apollo';
import Panel from '@santiment-network/ui/Panel';
import Loader from '@santiment-network/ui/Loader/Loader';
import Icon from '@santiment-network/ui/Icon';
import Button from '@santiment-network/ui/Button';
import { SearchWithSuggestions } from '@santiment-network/ui/Search';
import ToggleMetricButton from './ToggleMetricButton';
import { PROJECT_METRICS_BY_SLUG_QUERY } from './gql';
import { getCategoryGraph } from '../Studio/Sidebar/utils';
import { getMarketSegment } from './utils';
import { useTrackEvents } from './../../hooks/tracking';
import styles from './ChartMetricSelector.module.css';
export const NO_GROUP = '_';

const predicate = searchTerm => {
  const upperCaseSearchTerm = searchTerm.toUpperCase();
  return ({
    label
  }) => label.toUpperCase().includes(upperCaseSearchTerm);
};

const suggestionContent = ({
  label
}) => label;

const getMetricSuggestions = categories => {
  const suggestions = [];

  for (const categoryKey in categories) {
    const category = categories[categoryKey];
    const items = [];

    for (const group in category) {
      items.push(...category[group]);
    }

    suggestions.push({
      suggestionContent,
      items,
      title: categoryKey,
      predicate: predicate
    });
  }

  return suggestions;
};

export const countCategoryActiveMetrics = (activeMetrics = []) => {
  const counter = {};

  for (let i = 0; i < activeMetrics.length; i++) {
    let {
      category
    } = activeMetrics[i] || {};

    if (Array.isArray(category)) {
      category = category[0];
    }

    counter[category] = (counter[category] || 0) + 1;
  }

  return counter;
};

const ChartMetricSelector = _ref => {
  let {
    className = '',
    toggleMetric,
    activeMetrics,
    activeEvents,
    disabledMetrics,
    isMobile,
    hiddenMetrics,
    categories,
    loading,
    showLimitMessage,
    onSave
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [activeCategory, setCategory] = useState('Financial');
  const [trackEvent] = useTrackEvents();

  const changeCategory = category => {
    if (category === activeCategory) {
      setCategory(null);
    } else {
      trackEvent({
        category: 'Chart',
        action: `Selecting category ${category}`
      });
      setCategory(category);
    }
  };

  const actives = [...activeEvents, ...activeMetrics];
  const categoryActiveMetricsCounter = countCategoryActiveMetrics(actives);

  const isActiveCategory = category => category === activeCategory;

  const isActiveMetric = metric => actives.includes(metric);

  return /*#__PURE__*/React.createElement(Panel, _extends({}, props, {
    className: styles.panel
  }), /*#__PURE__*/React.createElement(Panel.Title, {
    className: styles.header
  }, "Select up to ", isMobile ? 3 : 5, " metrics"), !isMobile && /*#__PURE__*/React.createElement("div", {
    className: styles.search
  }, /*#__PURE__*/React.createElement(SearchWithSuggestions, {
    withMoreSuggestions: false,
    data: getMetricSuggestions(categories),
    onSuggestionSelect: ({
      item
    }) => toggleMetric(item),
    dontResetStateAfterSelection: true
  })), /*#__PURE__*/React.createElement(Panel.Content, {
    className: cx(styles.wrapper, className)
  }, loading && /*#__PURE__*/React.createElement(Loader, {
    className: styles.loader
  }), isMobile ? /*#__PURE__*/React.createElement("div", {
    className: cx(styles.column, styles.categories)
  }, Object.keys(categories).map(category => {
    const counter = categoryActiveMetricsCounter[category];
    const isActive = isActiveCategory(category);
    return /*#__PURE__*/React.createElement("div", {
      key: category,
      className: styles.category
    }, /*#__PURE__*/React.createElement(Button, {
      onClick: () => changeCategory(category),
      className: styles.mobileButton
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.mobileCategory
    }, category, counter > 0 && /*#__PURE__*/React.createElement("span", {
      className: styles.mobileCounter
    }, "(", counter, ")")), /*#__PURE__*/React.createElement(Icon, {
      type: "arrow-right-big",
      className: cx(styles.mobileButton__arrow, isActive && styles.mobileButton__arrow_active)
    })), isActive && /*#__PURE__*/React.createElement("div", {
      className: cx(styles.metrics)
    }, categories[activeCategory] && Object.keys(categories[activeCategory]).map(group => /*#__PURE__*/React.createElement("div", {
      key: group,
      className: styles.mobileGroup
    }, group !== NO_GROUP && /*#__PURE__*/React.createElement("h3", {
      className: styles.group__title
    }, group), categories[activeCategory][group].map(({
      item: metric
    }) => {
      if (metric.hidden) {
        return null;
      }

      return /*#__PURE__*/React.createElement(ToggleMetricButton, {
        key: metric.label,
        metric: metric,
        onClick: () => toggleMetric(metric),
        isActive: isActiveMetric(metric),
        isMobile: true,
        label: metric.label
      });
    })))));
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.column, styles.categories)
  }, Object.keys(categories).map(category => {
    const counter = categoryActiveMetricsCounter[category];
    return /*#__PURE__*/React.createElement("div", {
      key: category,
      className: styles.category
    }, /*#__PURE__*/React.createElement(Button, {
      onClick: () => changeCategory(category),
      variant: "ghost",
      fluid: true,
      className: styles.btn,
      isActive: isActiveCategory(category),
      classes: styles
    }, category, counter > 0 && `  (${counter})`, /*#__PURE__*/React.createElement(Icon, {
      type: "arrow-right-small"
    })));
  })), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.column, styles.metrics)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.visible
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.visible__scroll
  }, categories[activeCategory] && Object.keys(categories[activeCategory]).map(group => /*#__PURE__*/React.createElement("div", {
    key: group,
    className: styles.group
  }, group !== NO_GROUP && /*#__PURE__*/React.createElement("h3", {
    className: styles.group__title
  }, group), categories[activeCategory][group].map(metric => {
    const error = disabledMetrics[metric.key];

    if (metric.hidden) {
      return null;
    }

    return /*#__PURE__*/React.createElement(ToggleMetricButton, {
      key: metric.label,
      metric: metric,
      onClick: error ? undefined : () => toggleMetric(metric),
      isActive: isActiveMetric(metric),
      error: error,
      label: metric.label
    });
  })))))))), isMobile && /*#__PURE__*/React.createElement("div", {
    className: styles.save
  }, showLimitMessage && /*#__PURE__*/React.createElement("span", {
    className: styles.limit
  }, "Delete one metric to add a new one"), /*#__PURE__*/React.createElement(Button, {
    onClick: onSave,
    variant: "fill",
    accent: "positive",
    disabled: loading
  }, "Save changes")));
};

export default graphql(PROJECT_METRICS_BY_SLUG_QUERY, {
  props: ({
    data: {
      loading,
      project: {
        availableMetrics = [],
        availableQueries = [],
        marketSegments = []
      } = {}
    },
    ownProps: {
      hiddenMetrics,
      isBeta
    }
  }) => {
    const categories = getCategoryGraph(availableQueries.concat(availableMetrics).concat(marketSegments.map(getMarketSegment)), hiddenMetrics, {}, isBeta);
    return {
      loading,
      categories
    };
  },
  options: ({
    slug
  }) => {
    return {
      variables: {
        slug
      }
    };
  }
})(ChartMetricSelector);