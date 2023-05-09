import React from 'react';
import cx from 'classnames';
import { useField, useFormikContext } from 'formik';
import Selector from '@santiment-network/ui/Selector/Selector';
import StepTitle from '../../StepTitle/StepTitle';
import NextStep from '../../NextStep/NextStep';
import AssetSelector from '../AssetSelector/AssetSelector';
import WatchlistAndScreenerSelector from '../WatchlistAndScreenerSelector/WatchlistAndScreenerSelector';
import { SOCIAL_TRENDS_OPTIONS } from './constants';
import styles from './SocialTrendsSelector.module.css';

const SocialTrendsSelector = ({
  selectorSettings: {
    setSelectedStep,
    selectedStep,
    visitedSteps,
    setVisitedSteps,
    shouldHideRestrictionMessage
  },
  selectorSettings
}) => {
  const [, {
    value: target
  }, {
    setValue: setTarget
  }] = useField('settings.target');
  const [,, {
    setValue: setOperation
  }] = useField('settings.operation');
  const {
    values: {
      settings: {
        target: {
          slug,
          watchlist_id,
          word
        }
      }
    }
  } = useFormikContext();

  function handleNextClick() {
    setSelectedStep(selectedStep + 1);

    if (!visitedSteps.has(selectedStep + 1)) {
      setVisitedSteps(prev => [...prev, selectedStep + 1]);
    }
  }

  function handleSelectTarget(target) {
    if (target === 'slug') {
      setTarget({
        slug: ''
      });
      setOperation({
        trending_project: true
      });
    }

    if (target === 'word') {
      setTarget({
        word: ''
      });
      setOperation({
        trending_word: true
      });
    }

    if (target === 'watchlist_id') {
      setTarget({
        watchlist_id: ''
      });
      setOperation({
        trending_project: true
      });
    }
  }

  const noSlug = typeof slug === 'string' ? !slug : slug && slug.length === 0;
  const noWord = typeof word === 'string' ? !word : word && word.length === 0;
  const defaultSelector = target && Object.keys(target)[0];
  let children = /*#__PURE__*/React.createElement(React.Fragment, null);

  if (defaultSelector === 'slug') {
    children = /*#__PURE__*/React.createElement(AssetSelector, {
      isSocial: true,
      selectorSettings: selectorSettings
    });
  }

  if (defaultSelector === 'word') {
    children = /*#__PURE__*/React.createElement(AssetSelector, {
      key: "word",
      isSocial: true,
      isWords: true,
      selectorSettings: selectorSettings
    });
  }

  if (defaultSelector === 'watchlist_id') {
    children = /*#__PURE__*/React.createElement(WatchlistAndScreenerSelector, {
      type: "watchlist",
      isSocial: true,
      selectorSettings: selectorSettings
    });
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.titleWrapper
  }, /*#__PURE__*/React.createElement(StepTitle, {
    title: "Choose Social trend",
    className: styles.title
  }), (!noSlug || watchlist_id || !noWord) && /*#__PURE__*/React.createElement(NextStep, {
    label: "Notification settings",
    onClick: handleNextClick
  })), /*#__PURE__*/React.createElement(Selector, {
    className: styles.selector,
    options: SOCIAL_TRENDS_OPTIONS.map(({
      type
    }) => type),
    nameOptions: SOCIAL_TRENDS_OPTIONS.map(({
      label
    }) => label),
    defaultSelected: defaultSelector || 'slug',
    onSelectOption: handleSelectTarget,
    variant: "border"
  }), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.content, !shouldHideRestrictionMessage && styles.contentResized)
  }, children));
};

export default SocialTrendsSelector;