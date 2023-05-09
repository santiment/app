const _excluded = ["title", "isActive", "onClick"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useMemo } from 'react';
import gql from 'graphql-tag';
import cx from 'classnames';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import Icon from '@santiment-network/ui/Icon';
import { Row as BaseRow } from '../index';
import { PROJECT } from '../../../../ducks/Watchlists/detector';
import NewWatchlist from '../../../../ducks/Watchlists/Actions/New';
import styles from './index.module.css';
const LS_ARTICLE_IS_READ = 'LS_ARTICLE_IS_READ';
const FETCH_POLICY = {
  fetchPolicy: 'cache-and-network'
};
export const USER_QUERY = gql`
  {
    currentUser {
      id
      email
      username
      settings {
        hasTelegramConnected
      }
      chartConfigurations {
        id
      }
      watchlists {
        id
      }
    }
  }
`;
const DEFAULT_STATS = {
  loginHref: '/login'
};

const setArticleIsRead = tab => localStorage.setItem(LS_ARTICLE_IS_READ, '+');

const getArticleIsRead = tab => !!localStorage.getItem(LS_ARTICLE_IS_READ);

function useIsArticleRead() {
  const [isArticleRead, setIsArticleRead] = useState(getArticleIsRead);
  return {
    isArticleRead,
    readArticle: () => setIsArticleRead(true) || setArticleIsRead()
  };
}

function useUserStats() {
  const {
    data
  } = useQuery(USER_QUERY, FETCH_POLICY);
  return useMemo(() => {
    if (!data || !data.currentUser) return DEFAULT_STATS;
    const {
      email,
      username,
      settings,
      watchlists,
      chartConfigurations
    } = data.currentUser;
    return {
      personalInfo: !!(email && username),
      telegram: settings.hasTelegramConnected,
      watchlists: !!watchlists.length,
      charts: !!chartConfigurations.length
    };
  }, [data]);
}

const Row = _ref => {
  let {
    title,
    isActive,
    onClick
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(BaseRow, _extends({}, props, {
    className: cx(styles.row, isActive && styles.row__active),
    onClick: isActive ? undefined : onClick
  }), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.status, isActive && styles.status_active)
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "checkmark",
    className: styles.checkmark
  })), title, /*#__PURE__*/React.createElement(Icon, {
    type: "arrow-right-big",
    className: styles.arrow
  }));
};

const StartGuide = () => {
  const {
    personalInfo,
    telegram,
    watchlists,
    charts,
    loginHref
  } = useUserStats();
  const {
    isArticleRead,
    readArticle
  } = useIsArticleRead();
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("h4", {
    className: styles.title
  }, "Starting with Sanbase"), /*#__PURE__*/React.createElement(Row, {
    title: "Getting started for traders",
    href: "https://academy.santiment.net/for-traders/",
    target: "_blank",
    As: "a",
    isActive: isArticleRead,
    onClick: readArticle
  }), /*#__PURE__*/React.createElement(Row, {
    title: "Add name and profile photo",
    to: "/account",
    As: Link,
    isActive: personalInfo
  }), /*#__PURE__*/React.createElement(Row, {
    title: "Connect with Telegram",
    to: "/account",
    As: Link,
    isActive: telegram
  }), /*#__PURE__*/React.createElement(Row, {
    title: "Create your first Chart Layout",
    to: loginHref || '/charts',
    As: loginHref && Link,
    isActive: charts
  }), /*#__PURE__*/React.createElement(NewWatchlist, {
    type: PROJECT,
    trigger: /*#__PURE__*/React.createElement(Row, {
      title: "Create your first Watchlist",
      to: loginHref,
      As: loginHref && Link,
      isActive: watchlists
    })
  }));
};

export default StartGuide;