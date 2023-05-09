const _excluded = ["count"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import toReact from 'svelte-adapter/react';
import SvelteComments from 'webkit/ui/Comments/svelte';
import { useUser } from '../stores/user';
import cx from 'classnames';
import Modal from '@santiment-network/ui/Modal';
import Panel from '@santiment-network/ui/Panel';
import Icon from '@santiment-network/ui/Icon';
import sharedStyles from '@cmp/Insight/InsightCard.module.css';
import styles from '@cmp/Insight/comments/Comments.module.css';
const ReactComments = toReact(SvelteComments, {}, 'div');
export const Comments = props => {
  const {
    user
  } = useUser();
  return /*#__PURE__*/React.createElement(ReactComments, _extends({}, props, {
    currentUser: user
  }));
};
export const CommentsButton = _ref => {
  let {
    count
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(Modal, {
    trigger: /*#__PURE__*/React.createElement("div", {
      className: cx(sharedStyles.stat, sharedStyles.stat_comments)
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "comment",
      className: sharedStyles.commentIcon
    }), " ", count),
    as: Panel,
    classes: {
      wrapper: styles.wrapper,
      modal: cx(styles.modal)
    }
  }, /*#__PURE__*/React.createElement(Comments, rest));
};