import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Selector from '@santiment-network/ui/Selector/Selector';
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect';
import { METRIC_TARGET_OPTIONS, METRIC_KEYS_WITH_TEXT_SELECTOR, METRIC_TARGET_TEXT } from '../../../utils/constants';
import { getRecentTrends } from '../../../../../utils/recent';
import GetProjects from '../../../common/projects/getProjects';
import { isAsset, isWatchlist, isText } from '../../../utils/utils';
import TriggerFormWatchlists from './TriggerFormWatchlists';
import { TriggerProjectsSelector } from './projectsSelector/TriggerProjectsSelector';
import styles from '../signal/TriggerForm.module.css';
const propTypes = {
  metaFormSettings: PropTypes.any
};

const findCurrentSelector = (options, selector) => {
  return options.find(({
    value
  }) => value === selector);
};

const TriggerFormAssetWallet = ({
  metaFormSettings: {
    target: defaultAsset,
    signalType: defaultSignalType
  },
  setFieldValue,
  values,
  metric
}) => {
  const {
    signalType,
    target
  } = values;
  const [trendsOptions] = useState(() => getRecentTrends().map(text => ({
    label: text,
    value: text
  })));
  const defaultSelected = signalType ? signalType.value : defaultSignalType.value.value;
  const isTextSelectors = METRIC_KEYS_WITH_TEXT_SELECTOR.includes(metric.key);
  const options = useMemo(() => {
    return isTextSelectors ? METRIC_TARGET_OPTIONS : METRIC_TARGET_OPTIONS.filter(option => option !== METRIC_TARGET_TEXT);
  }, [metric, isTextSelectors]);
  useEffect(() => {
    if (signalType && !findCurrentSelector(options, defaultSelected)) {
      updateType(options[0]);
    }
  }, [options, defaultSelected]);

  function updateType(type) {
    setFieldValue('signalType', type);

    if (isAsset(type)) {
      setFieldValue('target', target || defaultAsset.value);
    }
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.row, styles.rowTop)
  }, /*#__PURE__*/React.createElement(Selector, {
    className: styles.selector,
    options: options.map(({
      value
    }) => value),
    nameOptions: options.map(({
      label
    }) => label),
    defaultSelected: defaultSelected,
    onSelectOption: selectedValue => {
      const type = findCurrentSelector(options, selectedValue);
      updateType(type);
    },
    variant: "border"
  })), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.row, styles.rowTop)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.Field, styles.fieldFilled)
  }, isAsset(signalType) && /*#__PURE__*/React.createElement(GetProjects, {
    render: ({
      allProjects,
      isLoading
    }) => {
      return /*#__PURE__*/React.createElement(TriggerProjectsSelector, {
        isLoading: isLoading,
        name: "target",
        target: target,
        projects: allProjects,
        setFieldValue: setFieldValue
      });
    }
  }), isWatchlist(signalType) && /*#__PURE__*/React.createElement(TriggerFormWatchlists, {
    values: values,
    setFieldValue: setFieldValue
  }), isText(signalType) && /*#__PURE__*/React.createElement(FormikSelect, {
    multi: false,
    isCreatable: true,
    name: "textSelector",
    placeholder: "Enter a word or a phrase...",
    options: trendsOptions
  }))));
};

TriggerFormAssetWallet.propTypes = propTypes;
export default TriggerFormAssetWallet;