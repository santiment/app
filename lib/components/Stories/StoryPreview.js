const _excluded = ["className", "previewTitle", "onClick", "previewImage", "createdAt", "type", "isTutorial"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import Label from '@santiment-network/ui/Label';
import Panel from '@santiment-network/ui/Panel/Panel';
import { addDays } from '../../utils/dates';
import styles from './StoryPreview.module.css';
const LIMIT_DAYS = 7;

const StoryPreview = _ref => {
  let {
    className = '',
    previewTitle,
    onClick,
    previewImage,
    createdAt,
    type,
    isTutorial
  } = _ref,
      info = _objectWithoutProperties(_ref, _excluded);

  const isNew = addDays(new Date(), -1 * LIMIT_DAYS) <= new Date(createdAt);
  return /*#__PURE__*/React.createElement(Panel, {
    className: cx(styles.wrapper, className, isTutorial && styles.tutorial),
    onClick: onClick
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.info
  }, /*#__PURE__*/React.createElement("h4", {
    className: styles.heading
  }, isNew && /*#__PURE__*/React.createElement(Label, {
    className: styles.newLabel,
    accent: isTutorial ? 'heliotrope' : 'jungle-green',
    variant: "fill"
  }, "NEW"), /*#__PURE__*/React.createElement("span", {
    className: cx(styles.title, isNew && styles.newTitle)
  }, previewTitle))), /*#__PURE__*/React.createElement("div", {
    className: styles.image
  }, /*#__PURE__*/React.createElement("img", {
    src: info.slides[0].videoId ? `https://i.ytimg.com/vi/${info.slides[0].videoId}/maxresdefault.jpg` : info.slides[0].image,
    alt: ""
  })));
};

export default StoryPreview;