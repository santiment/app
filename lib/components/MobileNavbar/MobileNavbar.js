function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { withRouter, NavLink as Link } from 'react-router-dom';
import cx from 'classnames';
import toReact from 'svelte-adapter/react';
import SvelteProfilePic from 'webkit/ui/Profile/Pic.svelte';
import Icon from '@santiment-network/ui/Icon';
import Button from '@santiment-network/ui/Button';
import MobileNavbarAction from './MobileNavbarAction';
import AssetsIcon from './AssetsIcon';
import InsightsIcon from './InsightsIcon';
import WatchlistsIcon from './WatchlistsIcon';
import MenuIcon from './MenuIcon';
import { useUser } from '../../stores/user';
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions';
import ContactUs from '../ContactUs/ContactUs';
import MobileWrapper from '../../pages/Login/Mobile/MobileWrapper';
import styles from './MobileNavbar.module.css';
const ProfilePic = toReact(SvelteProfilePic, {
  '--img-size': '48px',
  '--img-overflow': 'visible'
}, 'div');
const NAVBAR_LINKS = [{
  label: 'Market',
  linkTo: '/assets',
  Icon: AssetsIcon
}, {
  label: 'Watchlist',
  linkTo: '/watchlists',
  Icon: WatchlistsIcon
}, {
  href: '/insights/',
  label: 'Insights',
  Icon: InsightsIcon
}];
const MENU_LINKS = [{
  linkTo: '/alerts',
  label: 'Alerts'
}, {
  linkTo: '/labs/trends/explore/',
  label: 'Social tool'
}, {
  linkTo: '/nft',
  label: 'NFT Influencers'
}, {
  linkTo: 'https://academy.santiment.net',
  label: 'Academy',
  isExternal: true
}, {
  linkTo: '/pricing',
  label: 'Pricing'
}];

const MobileNavbar = ({
  history,
  activeLink
}) => {
  const {
    user,
    isLoggedIn
  } = useUser();
  const [isOpened, setOpened] = useState(false);
  const {
    isPro,
    isProPlus
  } = useUserSubscriptionStatus();
  const hasProBadge = isPro || isProPlus;

  const toggleMenu = () => setOpened(!isOpened);

  const handleNavigation = linkTo => {
    isOpened && toggleMenu();
    history.push(linkTo);
  };

  if (window.Intercom) {
    window.Intercom('onShow', function () {
      const intercomContainer = window.document.querySelector('#intercom-container');
      if (intercomContainer) intercomContainer.style.display = 'block';
    });
    window.Intercom('onHide', function () {
      const intercomContainer = window.document.querySelector('#intercom-container');
      if (intercomContainer) intercomContainer.style.display = 'none';
    });
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx({
      [styles.overlay]: isOpened
    })
  }, /*#__PURE__*/React.createElement(Helmet, null, /*#__PURE__*/React.createElement("body", {
    style: isOpened ? {
      position: 'fixed',
      overflow: 'hidden'
    } : ''
  })), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, 'fluid row v-center justify')
  }, NAVBAR_LINKS.map((props, index) => {
    return /*#__PURE__*/React.createElement(MobileNavbarAction, _extends({
      key: index,
      isActive: !isOpened && activeLink.includes(props.linkTo),
      onClick: handleNavigation
    }, props));
  }), /*#__PURE__*/React.createElement(MobileNavbarAction, {
    onClick: toggleMenu,
    Icon: MenuIcon,
    isActive: isOpened,
    label: "Menu"
  })), isOpened && /*#__PURE__*/React.createElement(MobileWrapper, {
    withHeader: true,
    toggleMenu: toggleMenu
  }, /*#__PURE__*/React.createElement("div", {
    onClick: toggleMenu,
    className: styles.navigationList
  }, MENU_LINKS.map(({
    linkTo,
    label,
    isExternal
  }) => {
    return isExternal ? /*#__PURE__*/React.createElement("a", {
      key: linkTo,
      href: linkTo,
      title: label,
      className: styles.navigationList__link
    }, label) : /*#__PURE__*/React.createElement(Link, {
      key: linkTo,
      to: linkTo,
      className: styles.navigationList__link
    }, label);
  }), /*#__PURE__*/React.createElement("hr", {
    className: styles.separator
  }), /*#__PURE__*/React.createElement(ContactUs, {
    className: cx(styles.navigationList__link, 'btn c-green')
  }, "Help & Feedback")), isLoggedIn && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.btn, styles.btn__create)
  }, /*#__PURE__*/React.createElement("div", {
    className: "fluid row v-center"
  }, /*#__PURE__*/React.createElement(ProfilePic, {
    src: user.avatarUrl,
    placeholderWidth: 48
  }), hasProBadge && /*#__PURE__*/React.createElement("div", {
    className: cx(styles.crown, 'row hv-center')
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "crown",
    width: 12,
    height: 9
  })), /*#__PURE__*/React.createElement("div", {
    className: "mrg--l mrg-m"
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.username, 'body-2 txt-m')
  }, "@", user.username), /*#__PURE__*/React.createElement("div", {
    className: "body-3 txt-r c-waterloo"
  }, user.email)))), /*#__PURE__*/React.createElement(Button, {
    className: cx(styles.btn, styles.btn__login),
    variant: "flat",
    border: true,
    onClick: () => handleNavigation('/account')
  }, "Account settings")), !isLoggedIn && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    className: cx(styles.btn, styles.btn__create),
    variant: "flat",
    border: true,
    onClick: () => handleNavigation('/sign-up')
  }, "Sign up"), /*#__PURE__*/React.createElement(Button, {
    className: cx(styles.btn, styles.btn__login),
    variant: "flat",
    border: true,
    onClick: () => handleNavigation('/login')
  }, "Log in"))));
};

export default withRouter(MobileNavbar);