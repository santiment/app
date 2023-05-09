import React, { useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import { HashLink as Link } from 'react-router-hash-link';
import { useHistory } from 'react-router-dom';
import { useEventListener } from '../../hooks/eventListeners';
import styles from './LeftPageNavigation.module.css';
export const extractFirstAnchor = (list, hash, accessor, shouldExist) => {
  const matchAnchor = hash ? hash.slice(1) : hash;

  if (shouldExist && !matchAnchor) {
    return list.find(item => item[accessor]);
  }

  return list.find(item => item[accessor] === matchAnchor) || list[0];
};
export const useNavigationAnchor = (list, accessor = 'key') => {
  const history = useHistory();
  const [active, setActive] = useState(() => extractFirstAnchor(list, history.location.hash, accessor));
  useEffect(() => {
    if (list.length > 0 && active && active[accessor]) {
      history.replace(`${window.location.pathname}#${active[accessor]}`);
    }
  }, [active]);
  return {
    setActive,
    active
  };
};

const LeftPageNavigation = ({
  anchors
}) => {
  const preparedAnchors = useMemo(() => {
    if (Array.isArray(anchors)) {
      return anchors.reduce((acc, val) => {
        return [...acc, ...val.list];
      }, []);
    }

    return Object.values(anchors);
  }, [anchors]);
  const {
    setActive,
    active
  } = useNavigationAnchor(preparedAnchors);
  useEventListener('scroll', () => {
    const offsets = preparedAnchors.map(({
      key
    }) => {
      const el = document.getElementById(key);
      const rect = el.getBoundingClientRect();
      return {
        key,
        info: rect,
        top: rect.top + window.scrollY + rect.height / 2
      };
    });
    const border = window.scrollY;
    const findCurrentTab = offsets.findIndex(({
      top
    }) => top > border);
    const tab = preparedAnchors[findCurrentTab];

    if (tab) {
      setActive(tab);
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, Array.isArray(anchors) ? /*#__PURE__*/React.createElement(React.Fragment, null, anchors.map(({
    title,
    list
  }) => {
    return /*#__PURE__*/React.createElement("div", {
      key: title,
      className: styles.list
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.title
    }, title), /*#__PURE__*/React.createElement(RenderList, {
      list: list,
      setActive: setActive,
      active: active
    }));
  })) : /*#__PURE__*/React.createElement(RenderList, {
    list: preparedAnchors,
    setActive: setActive,
    active: active
  }));
};

const RenderList = ({
  list,
  setActive,
  active
}) => list.map(item => /*#__PURE__*/React.createElement(NavigationItem, {
  item: item,
  key: item.key,
  setActive: setActive,
  active: active
}));

const NavigationItem = ({
  item,
  setActive,
  active
}) => {
  const {
    key,
    label
  } = item;
  return /*#__PURE__*/React.createElement(Link, {
    key: key,
    to: `#${key}`,
    onClick: () => setActive(item),
    className: cx(styles.item, key === active.key && styles.active)
  }, label);
};

export default LeftPageNavigation;