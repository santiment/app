import React, { useRef, useEffect } from 'react';
import Title from './Title';
import styles from './index.module.css';

function updateSelect(select, offsetX) {
  const {
    clientWidth
  } = select;
  const x = offsetX < 0 ? 0 : offsetX > clientWidth ? clientWidth : offsetX;
  select.style.setProperty('--x', x + 'px');
  select.dataset.value = 1 + Math.round(x / clientWidth * 99);
}

const DetailLevel = ({
  value,
  onChange
}) => {
  const selectRef = useRef();
  useEffect(() => {
    const select = selectRef.current;
    select.style.setProperty('--x', value / 100 * select.clientWidth + 'px');
  }, []);

  function onMouseDown(e) {
    const {
      currentTarget: select,
      clientX
    } = e;
    const xAbs = select.getBoundingClientRect().left;
    const xRel = clientX - xAbs;
    updateSelect(select, xRel);

    function onMouseMove({
      clientX
    }) {
      updateSelect(select, clientX - xAbs);
    }

    function onMouseUp() {
      onChange(+select.dataset.value);
      window.removeEventListener('mousemove', onMouseMove);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp, {
      once: true
    });
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.details
  }, /*#__PURE__*/React.createElement(Title, null, "Detail level"), /*#__PURE__*/React.createElement("div", {
    className: styles.range
  }, /*#__PURE__*/React.createElement("div", {
    ref: selectRef,
    className: styles.range__select,
    onMouseDown: onMouseDown,
    "data-value": value
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.range__limits
  }, /*#__PURE__*/React.createElement("span", null, "1"), /*#__PURE__*/React.createElement("span", null, "100"))));
};

export default DetailLevel;