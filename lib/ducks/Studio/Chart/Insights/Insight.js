const _excluded = ["type", "isDisabled"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import Loader from '@santiment-network/ui/Loader/Loader';
import { CommentsType } from 'san-webkit/lib/api/comments';
import { Comments } from '../../../../components/Comments';
import Avatar from './Avatar';
import Text from './Text';
import { getInsightText } from './queries';
import styles from './Insight.module.css';

const Action = _ref => {
  let {
    type,
    isDisabled
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement("div", _extends({}, props, {
    className: cx(styles.action, styles[type], isDisabled && styles.action_disabled)
  }), /*#__PURE__*/React.createElement(Icon, {
    type: "arrow-right-big"
  }));
};

const Insight = ({
  id,
  title,
  user,
  isPulseInsights,
  isFirst,
  isLast,
  onPrevClick,
  onNextClick
}) => {
  const [loading, setLoading] = useState();
  const [text, setText] = useState();
  const {
    username,
    avatarUrl
  } = user;
  useEffect(() => {
    let comments;
    const timer = setTimeout(() => comments || setLoading(true), 300);

    if (isPulseInsights) {
      getInsightText(id).then(setText);
    }

    function onKeyDown({
      target,
      key
    }) {
      if (target !== document.body) return; // eslint-disable-next-line

      switch (key) {
        case 'ArrowLeft':
          return isFirst || onPrevClick();

        case 'ArrowRight':
          return isLast || onNextClick();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.top
  }, /*#__PURE__*/React.createElement("a", {
    className: styles.title,
    href: `https://insights.santiment.net/read/${id}`
  }, title), /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(Action, {
    type: "left",
    onClick: onPrevClick,
    isDisabled: isFirst
  }), /*#__PURE__*/React.createElement(Action, {
    type: "right",
    onClick: onNextClick,
    isDisabled: isLast
  }))), /*#__PURE__*/React.createElement("a", {
    className: styles.user,
    href: `/profile/${user.id}`
  }, /*#__PURE__*/React.createElement(Avatar, {
    className: styles.user__avatar,
    src: avatarUrl
  }), username)), text && /*#__PURE__*/React.createElement(Text, {
    text: text
  }), /*#__PURE__*/React.createElement(Comments, {
    type: CommentsType.Insight,
    commentsFor: {
      id,
      user
    },
    titleClass: "h4 c-waterloo"
  }), loading && /*#__PURE__*/React.createElement(Loader, {
    className: styles.loader
  }));
};

export default /*#__PURE__*/React.memo(Insight);