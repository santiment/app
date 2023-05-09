import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import AlertMessage from '../../../../../../../components/Alert/AlertMessage';
import { ProjectIcon } from '../../../../../../../components/ProjectIcon/ProjectIcon';
import { useAssets } from '../../../../../../../hooks/project';
import styles from './Assets.module.css';

const Assets = ({
  description,
  invalidStepsMemo,
  selected,
  isFinished
}) => {
  const [projects, loading] = useAssets({
    shouldSkipLoggedInState: false
  });
  const {
    values
  } = useFormikContext();
  const {
    settings: {
      target: {
        slug
      }
    }
  } = values;
  const isInvalid = invalidStepsMemo.has('asset');
  useEffect(() => {
    if (slug && slug.length !== 0 && isInvalid) {
      invalidStepsMemo.delete('asset');
    }
  }, [slug, isInvalid]);
  let children;

  if (!slug || slug.length === 0 || loading) {
    children = description || '';
  }

  if (typeof slug !== 'string' && slug.length !== 0 && !loading) {
    const shouldRenderTicker = slug.length > 1;
    const assets = typeof slug === 'string' ? projects.find(project => project.slug === slug) : slug.map(item => projects.find(project => project.slug === item));
    children = /*#__PURE__*/React.createElement("div", {
      className: styles.wrapper
    }, assets.slice(0, 3).map(asset => /*#__PURE__*/React.createElement("div", {
      key: asset.id,
      className: styles.item
    }, /*#__PURE__*/React.createElement(ProjectIcon, {
      size: 16,
      slug: asset.slug,
      logoUrl: asset.logoUrl
    }), /*#__PURE__*/React.createElement("div", {
      className: styles.title
    }, shouldRenderTicker ? asset.ticker : asset.name))), assets.length > 3 && /*#__PURE__*/React.createElement("div", {
      className: styles.item
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.title
    }, "+ ", assets.length - 3)));
  } else if (slug.length !== 0 && !loading) {
    const assets = (typeof slug === 'string' ? projects.find(project => project.slug === slug) : slug.map(item => projects.find(project => project.slug === item))) || {};
    children = /*#__PURE__*/React.createElement("div", {
      className: styles.wrapper
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.item
    }, /*#__PURE__*/React.createElement(ProjectIcon, {
      size: 16,
      slug: assets.slug,
      logoUrl: assets.logoUrl
    }), /*#__PURE__*/React.createElement("div", {
      className: styles.title
    }, assets.name)));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.col
  }, (selected || isFinished) && children, isInvalid && /*#__PURE__*/React.createElement(AlertMessage, {
    className: styles.error,
    error: true,
    text: "Asset is required"
  }));
};

export default Assets;