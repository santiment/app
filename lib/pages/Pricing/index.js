import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Twitter from '@santiment-network/ui/Twitter';
import { querySanbasePlans } from 'san-webkit/lib/api/plans';
import { customerData$ } from 'san-webkit/lib/stores/user';
import { subscription$ } from 'san-webkit/lib/stores/subscription';
import Page from './index.svelte';
import Companies from './Companies/Companies';
import { TwitterBg } from './TwitterFeedbacks/TwitterFeedbacks';
import Testimonials from '../../components/Testimonials';
import PageLoader from '../../components/Loader/PageLoader';
import twitterStyles from './twitter.module.css';
import styles from './index.module.css';
export default (({
  isDesktop
}) => {
  const ref = useRef();
  const [referencedNode, setReferencedNode] = useState();
  const [twitterNode, setTwitterNode] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const root = document.getElementById('root');
    let race = false;
    Promise.all([querySanbasePlans(), subscription$.query(), customerData$.query()]).finally(() => {
      if (race) return;
      setLoading(false);
    });
    !isDesktop && (root.style.overflow = 'clip');
    return () => {
      race = true;
      !isDesktop && root.removeAttribute('style');
    };
  }, []);
  useEffect(() => {
    if (loading) return;
    const svelte = new Page({
      target: ref.current
    });
    setReferencedNode(document.querySelector('#referenced-by div'));
    setTwitterNode(document.querySelector('#twitter'));
    return () => svelte.$destroy();
  }, [loading]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: styles.wrapper
  }, loading && /*#__PURE__*/React.createElement(PageLoader, null), referencedNode && /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Companies, null), /*#__PURE__*/React.createElement(Testimonials, {
    slice: 3,
    wrapperClass: styles.testimonials
  })), referencedNode), twitterNode && /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement("div", {
    className: twitterStyles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: twitterStyles.header
  }, /*#__PURE__*/React.createElement(TwitterBg, {
    className: twitterStyles.headerBg
  }), /*#__PURE__*/React.createElement("div", {
    className: twitterStyles.title
  }, /*#__PURE__*/React.createElement(TwitterBg, {
    className: twitterStyles.twitterBlue
  }), "More reviews from Twitter")), /*#__PURE__*/React.createElement(Twitter, null)), twitterNode));
});