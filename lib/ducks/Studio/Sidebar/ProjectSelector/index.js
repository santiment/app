function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useMemo } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import Svg from 'san-webkit/lib/ui/Svg/react';
import { minifyAddress } from 'san-studio/lib/metrics/utils';
import ProjectSelectDialog from '../../Compare/ProjectSelectDialog';
import { DEFAULT_TABS } from '../../Compare/ProjectSelectTabs';
import { FIAT_MARKET_ASSETS } from '../../../dataHub/fiat';
import ProjectIcon from '../../../../components/ProjectIcon/ProjectIcon';
import { useDialogState } from '../../../../hooks/dialog';
import styles from './index.module.css';
const CUSTOM_CATEGORY = {
  Fiat: () => Promise.resolve(FIAT_MARKET_ASSETS)
};
const CUSTOM_TABS = DEFAULT_TABS.concat(Object.keys(CUSTOM_CATEGORY));
const ALL_STABLECOINS = {
  slug: 'stablecoins',
  name: 'Stablecoins',
  ticker: 'Stablecoins'
};
const STABLECOINS_ASSETS = [ALL_STABLECOINS];
const CategoryModifier = {
  All: assets => assets.concat(STABLECOINS_ASSETS).concat(FIAT_MARKET_ASSETS),
  Stablecoins: assets => STABLECOINS_ASSETS.concat(assets)
};

const Asset = ({
  slug,
  logoUrl,
  name
}) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProjectIcon, {
  size: 20,
  slug: slug,
  logoUrl: logoUrl,
  className: styles.icon
}), name, /*#__PURE__*/React.createElement(Icon, {
  type: "arrow-down",
  className: styles.arrow
}));

const Address = ({
  address
}) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
  className: cx(styles.addressIcon, 'row hv-center mrg-xs mrg--r')
}, /*#__PURE__*/React.createElement(Svg, {
  id: "report",
  w: "8"
})), /*#__PURE__*/React.createElement("span", {
  className: styles.address
}, address), /*#__PURE__*/React.createElement(Icon, {
  type: "arrow-down",
  className: styles.arrow
}));

const Selector = ({
  slug,
  name,
  address,
  logoUrl,
  onClick
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.selector,
  onClick: onClick
}, address ? /*#__PURE__*/React.createElement(Address, {
  address: address
}) : /*#__PURE__*/React.createElement(Asset, {
  slug: slug,
  name: name,
  logoUrl: logoUrl
}));

const ProjectSelector = ({
  project: {
    slug,
    name,
    logoUrl,
    address
  },
  address: masterAddress,
  onProjectSelect
}) => {
  const {
    isOpened,
    closeDialog,
    openDialog
  } = useDialogState();
  const categoryModifier = useMemo(() => {
    return masterAddress ? _objectSpread(_objectSpread({}, CategoryModifier), {}, {
      All: assets => [{
        address: masterAddress,
        slug: masterAddress,
        ticker: minifyAddress(masterAddress),
        name: masterAddress
      }].concat(CategoryModifier.All(assets))
    }) : CategoryModifier;
  }, [masterAddress]);

  function onSelect(project) {
    onProjectSelect(project);
    closeDialog();
  }

  return /*#__PURE__*/React.createElement(ProjectSelectDialog, {
    open: isOpened,
    activeSlug: address || slug,
    onOpen: openDialog,
    onClose: closeDialog,
    onSelect: onSelect,
    trigger: /*#__PURE__*/React.createElement(Selector, {
      slug: slug,
      logoUrl: logoUrl,
      name: name,
      address: address,
      onClick: openDialog
    }),
    customTabs: CUSTOM_TABS,
    CustomCategory: CUSTOM_CATEGORY,
    CategoryModifier: categoryModifier
  });
};

export default ProjectSelector;