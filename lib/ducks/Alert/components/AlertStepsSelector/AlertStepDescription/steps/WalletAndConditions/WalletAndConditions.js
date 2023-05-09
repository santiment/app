import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { ProjectIcon } from '../../../../../../../components/ProjectIcon/ProjectIcon';
import AlertMessage from '../../../../../../../components/Alert/AlertMessage';
import { clipText, getConditionsStr, parseOperation } from '../../../../../utils';
import { useAssets } from '../../../../../../../hooks/project';
import styles from './WalletAndConditions.module.css';

const WalletAndConditions = ({
  description,
  invalidStepsMemo,
  selected,
  isFinished
}) => {
  const {
    values: {
      settings: {
        target,
        selector,
        time_window,
        operation,
        type
      }
    }
  } = useFormikContext();
  const [projects, loading] = useAssets({
    shouldSkipLoggedInState: false
  });
  const isInvalid = invalidStepsMemo.has('wallet');
  useEffect(() => {
    const isInitialValuesInvalid = target.address && !loading && isInvalid;

    if (type === 'wallet_movement' && selector && isInitialValuesInvalid && selector.slug) {
      invalidStepsMemo.delete('wallet');
    }

    if (type === 'wallet_usd_valuation' && operation && isInitialValuesInvalid && selector.infrastructure) {
      invalidStepsMemo.delete('wallet');
    }

    if (type === 'wallet_assets_held' && isInitialValuesInvalid && selector.infrastructure) {
      invalidStepsMemo.delete('wallet');
    }
  }, [selector, target, loading, isInvalid, type]);
  let children = description || '';

  if (type === 'wallet_movement' && selector && target.address && selector.slug && !loading) {
    const project = projects.find(project => project.slug === selector.slug);
    const {
      selectedCount,
      selectedOperation
    } = parseOperation(operation);
    const conditionsStr = getConditionsStr({
      operation: selectedOperation,
      count: selectedCount,
      timeWindow: time_window
    });
    children = /*#__PURE__*/React.createElement("div", {
      className: styles.wrapper
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.address
    }, clipText(target.address, 24)), /*#__PURE__*/React.createElement("div", {
      className: styles.item
    }, /*#__PURE__*/React.createElement(ProjectIcon, {
      size: 16,
      slug: project.slug,
      logoUrl: project.logoUrl
    }), project.ticker), /*#__PURE__*/React.createElement("div", {
      className: styles.condition
    }, /*#__PURE__*/React.createElement("span", {
      className: styles.conditionType
    }, project.name), conditionsStr));
  }

  if (type === 'wallet_usd_valuation' && operation && target.address && selector.infrastructure && !loading) {
    const {
      selectedCount,
      selectedOperation
    } = parseOperation(operation);
    const conditionsStr = getConditionsStr({
      operation: selectedOperation,
      count: selectedCount,
      timeWindow: time_window
    });
    children = /*#__PURE__*/React.createElement("div", {
      className: styles.wrapper
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.address
    }, clipText(target.address, 24)), /*#__PURE__*/React.createElement("div", {
      className: styles.item
    }, "Full Capitalization"), /*#__PURE__*/React.createElement("div", {
      className: styles.condition
    }, /*#__PURE__*/React.createElement("span", {
      className: styles.conditionType
    }, "Balance"), conditionsStr));
  }

  if (type === 'wallet_assets_held' && target.address && selector.infrastructure && !loading) {
    children = /*#__PURE__*/React.createElement("div", {
      className: styles.wrapper
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.address
    }, clipText(target.address, 24)), /*#__PURE__*/React.createElement("div", {
      className: styles.item
    }, "Existed assets exit the wallet or new asset enters the wallet with non-zero balance"));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.col
  }, (selected || isFinished) && children, isInvalid && /*#__PURE__*/React.createElement(AlertMessage, {
    className: styles.error,
    error: true,
    text: "Wallet is required"
  }));
};

export default WalletAndConditions;