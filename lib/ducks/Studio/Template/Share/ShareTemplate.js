const _excluded = ["template"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo } from 'react';
import { getTemplateSharePath } from '../utils';
import ShareModalTrigger from '../../../../components/Share/ShareModalTrigger';

const ShareTemplate = _ref => {
  let {
    template
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const shareLink = useMemo(() => window.location.origin + getTemplateSharePath(template), [template]);

  if (!template.isPublic) {
    return null;
  }

  return /*#__PURE__*/React.createElement(ShareModalTrigger, _extends({
    dialogTitle: "Share Chart Layout",
    shareLink: shareLink,
    border: false
  }, rest));
};

export default ShareTemplate;