function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import Icon from '@santiment-network/ui/Icon';
import { DesktopOnly, MobileOnly } from '../../../components/Responsive';
import DesktopTweets from './DesktopTweets/DesktopTweets';
import { TweetCard, TweetsParsed } from './Tweets';
import styles from './TwitterFeedbacks.module.css';
export const SLIDER_SETTINGS = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false
};
export const useSlider = () => {
  const slider = useRef(null);

  const slickNext = () => {
    slider.current.slickNext();
  };

  const slickPrev = () => {
    slider.current.slickPrev();
  };

  return {
    slider,
    slickNext,
    slickPrev
  };
};
export const TwitterBg = ({
  className
}) => /*#__PURE__*/React.createElement(Icon, {
  type: "twitter",
  className: className
});

const TwitterFeedbacks = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    document.body.appendChild(script);
  }, []);
  const {
    slider
  } = useSlider();
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, /*#__PURE__*/React.createElement(TwitterBg, {
    className: styles.headerBg
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, /*#__PURE__*/React.createElement(TwitterBg, {
    className: styles.twitterBlue
  }), "More reviews from Twitter")), /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, /*#__PURE__*/React.createElement(DesktopTweets, null))), /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement("div", {
    className: styles.slider
  }, /*#__PURE__*/React.createElement(Slider, _extends({}, SLIDER_SETTINGS, {
    ref: slider
  }), TweetsParsed.map((item, index) => /*#__PURE__*/React.createElement(TweetCard, {
    item: item,
    key: index
  }))))));
};

export default TwitterFeedbacks;