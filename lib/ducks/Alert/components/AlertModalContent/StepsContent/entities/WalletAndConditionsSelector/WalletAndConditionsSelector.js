function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useEffect, useMemo, useState } from 'react';
import { useField } from 'formik';
import Input from '@santiment-network/ui/Input';
import Select from '@santiment-network/ui/Select/Select';
import { getAddressInfrastructure } from 'san-webkit/lib/utils/address';
import { track } from 'san-webkit/lib/analytics';
import StepTitle from '../../StepTitle/StepTitle';
import EventSelector from './EventSelector/EventSelector';
import ConditionsSelector from '../../MetricAndConditions/ConditionsSelector/ConditionsSelector';
import InfoBlock from './InfoBlock/InfoBlock';
import { useProjects } from '../../../../../../../stores/projects';
import { useWalletAssets } from '../../../../../hooks/useWalletAssets';
import { Infrastructure } from '../../../../../../../utils/address';
import { mapAssetsToProjects } from './utils';
import { AlertsEvents } from '../../../../../analytics';
import styles from './WalletAndConditionsSelector.module.css';

const WalletAndConditionsSelector = () => {
  const [currentEvent, setCurrentEvent] = useState({});
  const [selectedAsset, setSelectedAsset] = useState();
  const [, {
    value: address
  }, {
    setValue: setAddress
  }] = useField('settings.target.address');
  const [, {
    value: selector
  }, {
    setValue: setSelector
  }] = useField('settings.selector');
  const {
    assets = [],
    infrastructure
  } = useWalletAssets({
    walletAddress: address
  });
  const {
    projects
  } = useProjects();
  useEffect(() => {
    if (!selectedAsset && selector.slug && projects.length > 0) {
      const currentProject = projects.find(project => project.slug === selector.slug);
      setSelectedAsset({
        value: selector.slug,
        label: currentProject.name
      });
    }
  }, [selector, projects]);
  useEffect(() => {
    if (selectedAsset) {
      setSelector({
        infrastructure,
        slug: selectedAsset.value
      });
    }
  }, [selectedAsset]);
  useEffect(() => {
    if (address) {
      setSelector(_objectSpread(_objectSpread({}, selector), {}, {
        infrastructure: getAddressInfrastructure(address)
      }));
    }
  }, [address]);
  const walletProjects = useMemo(() => {
    return projects.length > 0 && assets.length > 0 ? mapAssetsToProjects(projects, assets) : [];
  }, [assets, projects]);
  let children;

  if (!currentEvent.settings) {
    children = /*#__PURE__*/React.createElement(React.Fragment, null);
  } else {
    switch (currentEvent.settings.type) {
      case 'wallet_usd_valuation':
        {
          children = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StepTitle, {
            title: "Condition",
            className: styles.conditionTitle
          }), /*#__PURE__*/React.createElement(InfoBlock, {
            metric: currentEvent.settings.type,
            assets: assets
          }), /*#__PURE__*/React.createElement("div", {
            className: styles.conditions
          }, /*#__PURE__*/React.createElement(ConditionsSelector, {
            metric: {
              category: ''
            },
            isWallet: true
          })));
          break;
        }

      case 'wallet_assets_held':
        {
          children = /*#__PURE__*/React.createElement(React.Fragment, null);
          break;
        }

      case 'wallet_movement':
      default:
        {
          children = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StepTitle, {
            title: "Condition"
          }), /*#__PURE__*/React.createElement("div", {
            className: styles.row
          }, /*#__PURE__*/React.createElement("div", {
            className: styles.label
          }, "Asset")), /*#__PURE__*/React.createElement(Select, {
            placeholder: "Select an asset",
            isDisabled: walletProjects.length === 0,
            isClearable: false,
            isSearchable: false,
            options: walletProjects,
            value: selectedAsset,
            onChange: asset => {
              track.event(AlertsEvents.SetAlertWalletAsset, {
                asset
              });
              setSelectedAsset(asset);
            },
            className: "mrg--b mrg-xl"
          }), /*#__PURE__*/React.createElement(InfoBlock, {
            metric: currentEvent.settings.type
          }), selector.slug && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
            className: styles.conditions
          }, /*#__PURE__*/React.createElement(ConditionsSelector, {
            metric: {
              category: ''
            },
            isWallet: true
          }))));
          break;
        }
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.titleWrapper
  }, /*#__PURE__*/React.createElement(StepTitle, {
    title: "Choose Wallet",
    className: styles.title
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.label
  }, "Wallet address"), address && infrastructure === Infrastructure.ETH && /*#__PURE__*/React.createElement("a", {
    href: `https://app.santiment.net/labs/balance?address=${address}`,
    target: "_blank",
    rel: "noopener noreferrer",
    className: styles.link
  }, "Open Sanbase")), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Type an address",
    value: address,
    onChange: e => {
      track.event(AlertsEvents.SetAlertAddress);
      setAddress(e.target.value);
    },
    className: styles.addressInput
  }), /*#__PURE__*/React.createElement(EventSelector, {
    address: address,
    onEventChange: setCurrentEvent,
    setSelectedAsset: setSelectedAsset
  }), children);
};

export default WalletAndConditionsSelector;