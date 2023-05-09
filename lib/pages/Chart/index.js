import React, { useMemo } from 'react';
import Studio from '../Studio/Studio';
import { parseUrl } from '../Studio/sharing/parse';
export default (({
  parsedUrl,
  search
}) => {
  const {
    widgets,
    settings,
    sidewidget
  } = useMemo(() => parsedUrl || parseUrl(search), [parsedUrl, search]);
  return /*#__PURE__*/React.createElement(Studio, {
    defaultWidgets: widgets,
    defaultSettings: settings,
    defaultSidewidget: sidewidget
  });
});