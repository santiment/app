function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import MultiInput from '@santiment-network/ui/Input/MultiInput';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import Toggle from '@santiment-network/ui/Toggle';
import DarkTooltip from '../../components/Tooltip/DarkTooltip';
import SearchMobile from './SearchMobile';
import { DEFAULT_TEXT } from '../../components/Trends/Search';
import styles from './Search.module.css';
const MAX_VALUES = 5;

function trimTopics(topics) {
  return topics.map(topic => topic.trim()).filter(Boolean);
}

const Search = ({
  topics,
  linkedAssets,
  activeLinkedAssets,
  onChangeTopics,
  setActiveLinkedAssets,
  isDesktop = true
}) => {
  const [isInFocus, setIsInFocus] = useState(false);
  const [values, setValues] = useState(topics);
  const inputRef = useRef(null);
  const isMaxValuesReached = values.length >= MAX_VALUES || topics.length >= MAX_VALUES;

  if (topics.length > MAX_VALUES) {
    onChangeTopics(topics.slice(0, MAX_VALUES));
  }

  useEffect(() => {
    if (values.length === 0) {
      setFocus();
    } else if (isMaxValuesReached) {
      setIsInFocus(false);
    }

    if (topics !== values) {
      onChangeTopics(trimTopics(values));
    }
  }, [values]);

  function setFocus() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function toggleLinkedAsset(text, asset, isActive) {
    const newActiveLinkedAssets = new Map(activeLinkedAssets);

    if (isActive) {
      newActiveLinkedAssets.delete(text);
    } else {
      newActiveLinkedAssets.set(text, asset);
    }

    setActiveLinkedAssets(newActiveLinkedAssets);
  }

  if (!isDesktop) {
    return /*#__PURE__*/React.createElement(SearchMobile, {
      onChangeTopics: onChangeTopics,
      topic: topics[0] || ''
    });
  }

  return /*#__PURE__*/React.createElement(MultiInput, {
    onValueAdd: (value, newValues) => setValues(newValues),
    onValueRemove: (value, newValues) => setValues(newValues),
    onFocus: () => setIsInFocus(true),
    onBlur: () => setIsInFocus(false),
    maxValues: MAX_VALUES,
    placeholder: DEFAULT_TEXT,
    values: topics,
    defaultValues: values,
    valueContent: text => {
      const detectedAsset = linkedAssets.get(text);
      const isActive = activeLinkedAssets.get(text);
      return detectedAsset ? /*#__PURE__*/React.createElement("div", {
        className: styles.content
      }, /*#__PURE__*/React.createElement(DarkTooltip, {
        position: "top",
        align: "start",
        on: "hover",
        trigger: /*#__PURE__*/React.createElement(Button, {
          className: styles.btn,
          onClick: () => toggleLinkedAsset(text, detectedAsset, isActive)
        }, /*#__PURE__*/React.createElement(Toggle, {
          IconActive: props => /*#__PURE__*/React.createElement("svg", _extends({
            xmlns: "http://www.w3.org/2000/svg",
            width: "7",
            height: "10"
          }, props), /*#__PURE__*/React.createElement("path", {
            fill: "#fff",
            d: "M2.8 10h-.2V9l-1.4-.4C.8 8.4.5 8 .3 7.8a2 2 0 01-.3-1v-.1h1.4l.2.1c0 .3.2.5.5.7l1 .2c.6 0 1 0 1.2-.2.3-.2.4-.5.4-.8 0-.2 0-.3-.2-.5L4 6l-1.2-.4C2 5.3 1.2 5 .8 4.7.4 4.4.2 3.9.2 3.2c0-.5.2-1 .6-1.4A3 3 0 012.5 1V.3l.1-.2.2-.1H3.7v1.1c.5 0 1 .2 1.3.4l.8.7.3.9a.2.2 0 01-.3.2h-1c-.2 0-.3 0-.3-.2s-.2-.4-.5-.6l-.9-.2c-.4 0-.7 0-1 .2-.2.2-.3.4-.3.7 0 .2 0 .4.2.5l.5.4 1.1.3c.7.1 1.2.3 1.6.5.4.2.6.4.8.7.2.3.3.6.3 1a2 2 0 01-.7 1.6c-.5.4-1 .7-1.8.8v.7l-.1.2-.2.1h-.7z"
          })),
          isActive: isActive,
          className: cx(styles.toggle, isActive && styles.active)
        }))
      }, "Click to switch to asset"), /*#__PURE__*/React.createElement(Link, {
        className: styles.link,
        to: `/projects/${detectedAsset.slug}`
      }, /*#__PURE__*/React.createElement(DarkTooltip, {
        position: "top",
        align: "start",
        on: "hover",
        trigger: /*#__PURE__*/React.createElement(Button, {
          className: styles.btn
        }, text)
      }, "Click to explore project page"))) : text;
    },
    className: styles.input,
    forwardedRef: inputRef
  }, (!isInFocus || isMaxValuesReached) && /*#__PURE__*/React.createElement(Button, {
    border: true,
    className: styles.button,
    disabled: isMaxValuesReached
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "plus",
    className: styles.plus
  }), "Compare"), isMaxValuesReached && /*#__PURE__*/React.createElement("span", {
    className: styles.limit
  }, "To add a new word, please delete one"));
};

export default Search;