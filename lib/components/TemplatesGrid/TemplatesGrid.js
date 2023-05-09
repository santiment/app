import React from 'react';
import Template from '../../ducks/Studio/Template/Dialog/LoadTemplate/Template';
import { sortById } from '../../utils/sortMethods';
import styles from './TemplatesGrid.module.css';

const TemplatesGrid = ({
  templates
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, templates.sort(sortById).map(template => /*#__PURE__*/React.createElement(Template, {
    key: template.id,
    template: template,
    className: styles.card,
    asLink: true
  })));
};

export default TemplatesGrid;