import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { SelectorNode } from 'san-studio/lib/metrics/selector';
import { useStore, getSvelteContext } from './stores';
import SocialContext from '../../ducks/Studio/AdvancedView/SocialContext';
import styles from './index.module.css';
export const useSidewidgetStore = studio => useMemo(() => getSvelteContext(studio, 'sidewidget'), [studio]);
export const useSidewidget = studio => useStore(useSidewidgetStore(studio));
const KeyToSidewidget = {
  [SelectorNode.SOCIAL_CONTEXT.key]: SocialContext
};

function mountSidewidget(Widget, target, setState) {
  target.classList.add(styles.sidepanel);
  setState({
    Widget,
    target
  });
}

const Sidewidget = ({
  studio,
  project,
  metrics,
  sidewidget,
  modDate,
  modRange
}) => {
  const [state, setState] = useState();
  useEffect(() => {
    const Widget = sidewidget && KeyToSidewidget[sidewidget.key || sidewidget];
    if (!Widget) return setState();
    const target = document.querySelector('.studio-sidewidget');

    if (target) {
      return mountSidewidget(Widget, target, setState);
    }

    const timer = setTimeout(() => {
      const target = document.querySelector('.studio-sidewidget');
      if (target) mountSidewidget(Widget, target, setState);
    }, 200);
    return () => clearTimeout(timer);
  }, [sidewidget]);
  return state ? /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement(state.Widget, {
    project: project,
    metrics: metrics,
    date: modDate || modRange && modRange[1],
    datesRange: modRange
  }), state.target) : null;
};

export default Sidewidget;