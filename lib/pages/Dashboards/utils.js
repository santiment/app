export function findScrollProperties(currentDashboard) {
  const keysArr = currentDashboard.submenu.filter(({
    key
  }) => key);
  const offsets = keysArr.map(({
    key
  }) => {
    const el = document.getElementById(key);
    const rect = el.getBoundingClientRect();
    return {
      key,
      info: rect,
      top: rect.top + window.scrollY
    };
  });
  const border = window.scrollY;
  const findCurrentTab = offsets.findIndex(({
    top
  }) => top > border);
  const tab = keysArr[findCurrentTab];
  return {
    offsets,
    findCurrentTab,
    tab
  };
}
export function scrollToCurrentAnchor({
  currentDashboard,
  hash
}) {
  const {
    offsets
  } = findScrollProperties(currentDashboard);
  window.scroll({
    top: offsets.find(anchor => anchor.key === hash.replace('#', '')).top - offsets[0].top,
    behavior: 'auto'
  });
}