import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import { getTemplateInfo, prepareTemplateLink } from '../../utils';
import TemplateDetailsDialog, { TemplateInfoTrigger } from '../../TemplateDetailsDialog/TemplateDetailsDialog';
import TemplateStatus from '../../TemplateStatus/TemplateStatus';
import { updateHistory } from '../../../../../utils/utils';
import styles from './Template.module.css';
import { isUserAuthorOfTemplate, usePublicTemplates } from './utils';
export const openTemplate = ({
  redirect,
  template,
  asProject
}) => {
  const link = prepareTemplateLink(template, asProject);
  updateHistory(link);
  redirect(link);
};

const Template = ({
  template,
  selectTemplate,
  isAuthor,
  asLink = false,
  className,
  redirect,
  onOpenTemplate,
  onRename = () => {},
  asProject
}) => {
  const {
    title
  } = template;
  const {
    isPublic,
    toggleIsPublic
  } = usePublicTemplates(template);

  function onTemplateClick() {
    selectTemplate && selectTemplate(template);

    if (asLink) {
      openTemplate({
        redirect,
        template,
        asProject
      });
    }
  }

  const {
    assets: usedAssets,
    metrics: usedMetrics
  } = getTemplateInfo(template);
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.left,
    onClick: onTemplateClick
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, title), /*#__PURE__*/React.createElement("div", {
    className: styles.info
  }, /*#__PURE__*/React.createElement(TemplateStatus, {
    isAuthor: isAuthor,
    isPublic: isPublic,
    toggleIsPublic: toggleIsPublic,
    classes: styles
  }), /*#__PURE__*/React.createElement("span", null, "\xB7 ", usedAssets.length, " asset(s) \xB7 ", usedMetrics.length, " metric(s)"))), onOpenTemplate ? /*#__PURE__*/React.createElement(TemplateInfoTrigger, {
    classes: styles,
    onClick: e => {
      e.stopPropagation();
      onOpenTemplate(template);
    }
  }) : /*#__PURE__*/React.createElement(TemplateDetailsDialog, {
    template: template,
    onRename: onRename,
    selectTemplate: selectTemplate
  }));
};

const mapStateToProps = ({
  user
}, {
  template
}) => ({
  isAuthor: isUserAuthorOfTemplate(user, template)
});

const mapDispatchToProps = dispatch => ({
  redirect: route => {
    dispatch(push(route));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Template);