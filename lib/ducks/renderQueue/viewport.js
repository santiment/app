import React, { useState, useContext, useEffect } from 'react';

function checkIsInViewport(container) {
  const {
    y,
    height
  } = container.getBoundingClientRect();
  const shouldBeInViewport = height * 0.3;
  return y > -shouldBeInViewport && y < shouldBeInViewport;
}

function RenderQueue() {
  const queue = [];
  const ItemRenderMap = new Map();
  let isLookingForViewportItem = true;
  let timer;

  function render() {
    const item = queue.shift();
    const renderItem = ItemRenderMap.get(item);

    if (renderItem) {
      renderItem(true);
    }
  }

  function scheduleRender() {
    if (queue.length) {
      timer = setTimeout(render, 200);
    } else {
      ItemRenderMap.clear();
    }
  }

  function register(item, render) {
    clearTimeout(timer);
    ItemRenderMap.set(item, render);
    scheduleRender();
    return () => clearTimeout(timer);
  }

  return ref => {
    const [isRendered, setIsRendered] = useState(false);
    useEffect(() => {
      const container = ref.current;

      if (isLookingForViewportItem && checkIsInViewport(container)) {
        isLookingForViewportItem = false;
        queue.unshift(container);
      } else {
        queue.push(container);
      }

      return register(container, setIsRendered);
    }, []);
    return {
      isRendered,
      onLoad: scheduleRender
    };
  };
}

const RenderQueueContext = /*#__PURE__*/React.createContext();
export const useRenderQueueItem = ref => useContext(RenderQueueContext)(ref);
export const RenderQueueProvider = ({
  children
}) => /*#__PURE__*/React.createElement(RenderQueueContext.Provider, {
  value: useState(RenderQueue)[0]
}, children);
export const withRenderQueueProvider = Component => props => /*#__PURE__*/React.createElement(RenderQueueProvider, null, /*#__PURE__*/React.createElement(Component, props));