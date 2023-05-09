function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import cx from 'classnames';
import Dialog from '@santiment-network/ui/Dialog';
import Icon from '@santiment-network/ui/Icon';
import StoryPreview from './StoryPreview';
import GA from './../../utils/tracking';
import { useTheme } from '../../stores/ui/theme';
import Story from './Story';
import { stories } from './content';
import { DesktopOnly } from '../Responsive';
import styles from './StoriesList.module.css';

const ScrollBtn = ({
  isRight,
  show = true,
  onClick
}) => {
  if (!show) {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.scrollBtn, isRight && styles.btnRight),
    onClick: onClick
  }, /*#__PURE__*/React.createElement(Icon, {
    type: isRight ? 'arrow-right' : 'arrow-left',
    className: styles.scrollIcon
  }));
};

const SCROLL_OFFSET = 300;

const StoriesList = ({
  classes = {},
  showScrollBtns,
  showShadows = false
}) => {
  const [selected, setSelected] = useState();
  const [canScrollLeft, setLeft] = useState(false);
  const [canScrollRight, setRight] = useState(true);
  const {
    isNightMode
  } = useTheme();
  const scrollRef = /*#__PURE__*/React.createRef();

  const scroll = isRight => {
    scrollRef.current.scrollLeft += (isRight ? 1 : -1) * SCROLL_OFFSET;
    setTimeout(() => {
      if (scrollRef && scrollRef.current) {
        const current = scrollRef.current;
        setLeft(current.scrollLeft > 0);
        setRight(current.scrollWidth - current.clientWidth - current.scrollLeft > 0);
      }
    }, 500);
  };

  return /*#__PURE__*/React.createElement("section", {
    className: cx(styles.list, classes.stories, showShadows && showScrollBtns && canScrollLeft && styles.hideLeft, showShadows && showScrollBtns && canScrollRight && styles.hideRight),
    style: {
      '--offset': '24px',
      '--shadowFrom': isNightMode ? 'rgba(24, 27, 43, 0)' : 'rgba(255, 255, 255, 0)',
      '--shadowTo': isNightMode ? 'rgba(24, 27, 43, 0.9)' : 'rgba(255, 255, 255, 0.9)'
    }
  }, showScrollBtns && canScrollLeft && /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(ScrollBtn, {
    onClick: () => {
      scroll(false);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.scrollableWrapper,
    ref: scrollRef
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.scrollable, classes.storiesScrollable)
  }, stories.map(story => /*#__PURE__*/React.createElement(StoryPreview, _extends({
    className: cx(styles.item, classes.story),
    key: story.previewTitle,
    onClick: () => {
      GA.event({
        category: 'Stories',
        action: `Opened "${story.previewTitle}" story `
      });
      setSelected(story);
    }
  }, story))))), showScrollBtns && canScrollRight && /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(ScrollBtn, {
    isRight: true,
    onClick: () => {
      scroll(true);
    }
  })), /*#__PURE__*/React.createElement(Dialog, {
    title: (selected || {}).storyHeaderName || '',
    open: !!selected,
    onClose: setSelected,
    classes: styles
  }, /*#__PURE__*/React.createElement(Dialog.ScrollContent, {
    className: styles.content
  }, selected && /*#__PURE__*/React.createElement(Story, {
    story: selected,
    onEnd: setSelected
  }))));
};

export default StoriesList;