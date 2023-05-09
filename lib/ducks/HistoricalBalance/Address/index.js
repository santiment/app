import React, { useState, useEffect, useMemo } from 'react';
import cx from 'classnames';
import Input from '@santiment-network/ui/Input';
import Labels from './Labels';
import Actions from './Actions';
import AssetsDistribution from './AssetsDistribution';
import CurrentBalance from './CurrentBalance';
import Setting from '../Setting';
import { Infrastructure, getAddressInfrastructure } from '../../../utils/address';
import { useAddressNote } from '../hooks';
import { DesktopOnly } from '../../../components/Responsive';
import HelpPopup from '../../../components/HelpPopup/HelpPopup';
import stylesTooltip from '../../../components/HelpPopup/HelpPopup.module.css';
import styles from './index.module.css';
export const AddressSetting = ({
  className,
  settings,
  walletAssets,
  chartAssets,
  isError,
  onAddressChange
}) => {
  const {
    address
  } = settings;
  const [value, setValue] = useState(address);
  const note = useAddressNote(settings);
  const infrastructure = useMemo(() => getAddressInfrastructure(value), [value]);
  useEffect(() => {
    if (address !== value) {
      setValue(address);
    }
  }, [address]);
  useEffect(() => {
    if (value === settings.address || !infrastructure) return;
    const timer = setTimeout(() => onAddressChange(value), 250);
    return () => clearTimeout(timer);
  }, [value]);

  function onChange({
    target: {
      value
    }
  }) {
    setValue(value);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className)
  }, /*#__PURE__*/React.createElement(Setting, {
    title: "Wallet address"
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.top
  }, /*#__PURE__*/React.createElement(Input, {
    autoComplete: "off",
    value: value,
    isError: isError || !infrastructure,
    onChange: onChange
  }), note && /*#__PURE__*/React.createElement(HelpPopup, {
    triggerClassName: styles.note
  }, /*#__PURE__*/React.createElement("h4", {
    className: stylesTooltip.title
  }, "Note"), note), /*#__PURE__*/React.createElement("div", {
    className: styles.bottom
  }, /*#__PURE__*/React.createElement(Labels, {
    settings: settings
  }), value && infrastructure === Infrastructure.ETH && /*#__PURE__*/React.createElement("a", {
    href: `https://etherscan.io/address/${value}`,
    target: "_blank",
    rel: "noopener noreferrer",
    className: styles.etherscan
  }, "Open Etherscan")))), /*#__PURE__*/React.createElement(Actions, {
    address: address,
    infrastructure: infrastructure,
    assets: chartAssets,
    note: note
  }), /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement("div", {
    className: styles.widgets
  }, /*#__PURE__*/React.createElement(AssetsDistribution, {
    walletAssets: walletAssets,
    className: styles.widget
  }), /*#__PURE__*/React.createElement(CurrentBalance, {
    walletAssets: walletAssets,
    className: styles.widget
  }))));
};
export default AddressSetting;