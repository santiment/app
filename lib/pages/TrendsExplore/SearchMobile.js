import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import useAutosizeTextArea from '../../hooks/textarea';
import { useDebounceEffect } from '../../hooks';
import styles from './Search.module.css';

const SearchMobile = ({
  topic = '',
  onChangeTopics
}) => {
  const textareaRef = useRef(null);
  const wrapperRef = useRef(null);
  const [textareaValue, setTextareaValue] = useState(topic);
  useAutosizeTextArea({
    textareaRef,
    wrapperRef,
    value: textareaValue
  });
  useEffect(() => {
    onChangeTopics([topic]);
    setTextareaValue(topic);
  }, [topic]);
  useDebounceEffect(() => onChangeTopics(textareaValue ? [textareaValue.trim()] : []), 700, [textareaValue]);
  useDebounceEffect(() => setTextareaValue(textareaValue.trim()), 500, [textareaValue]);

  function handleTopicChange(e) {
    const val = e.target.value;
    setTextareaValue(val);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "fluid relative mrg-xxl mrg--b",
    ref: wrapperRef
  }, textareaValue && /*#__PURE__*/React.createElement(Icon, {
    type: "close-medium",
    className: styles.textareaIcon,
    onClick: () => setTextareaValue(''),
    height: 12,
    width: 12
  }), /*#__PURE__*/React.createElement("textarea", {
    onChange: handleTopicChange,
    ref: textareaRef,
    rows: 1,
    value: textareaValue,
    className: cx(styles.textarea, 'input body-2 fluid', textareaValue && styles.textareaWithIcon),
    placeholder: "Enter a word or a phrase.."
  }));
};

export default SearchMobile;