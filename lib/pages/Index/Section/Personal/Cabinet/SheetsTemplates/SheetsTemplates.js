import React, { useMemo } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Icon from '@santiment-network/ui/Icon';
import Button from '@santiment-network/ui/Button';
import ExpansionItem from '../../../../../../components/ExpansionItem/ExpansionItem';
import { DEFAULT_SHEETS_TEMPLATES } from './utils';
import { ProLabel } from '../../../../../../components/ProLabel';
import { useUserSubscriptionStatus } from '../../../../../../stores/user/subscriptions';
import Skeleton from '../../../../../../components/Skeleton/Skeleton';
import styles from './SheetsTemplates.module.css';
const SHEETS_TEMPLATES_QUERY = gql`
  {
    getSheetsTemplates {
      url
      name
      description
      isPro
    }
  }
`;

function useSheetsTemplates() {
  const {
    data,
    loading
  } = useQuery(SHEETS_TEMPLATES_QUERY);
  return {
    loading,
    templates: data ? data.getSheetsTemplates : []
  };
}

const SheetsTemplates = () => {
  const {
    loading,
    templates
  } = useSheetsTemplates();
  const {
    isPro
  } = useUserSubscriptionStatus();
  const list = useMemo(() => templates.length > 0 ? templates : DEFAULT_SHEETS_TEMPLATES, [templates]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(Skeleton, {
    repeat: 5,
    className: styles.skeleton,
    show: loading
  }), !loading && list.map(({
    name,
    description,
    url,
    isPro: isProTemplate
  }, idx) => {
    const requirePro = !isPro && isProTemplate;
    return /*#__PURE__*/React.createElement(ExpansionItem, {
      isOpen: idx === 0,
      title: /*#__PURE__*/React.createElement(React.Fragment, null, name, requirePro && /*#__PURE__*/React.createElement(ProLabel, {
        className: styles.pro
      })),
      key: name,
      classes: styles
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.description
    }, /*#__PURE__*/React.createElement("div", null, description), url && !requirePro && /*#__PURE__*/React.createElement(Button, {
      as: "a",
      target: "_blank",
      href: url,
      accent: "positive",
      variant: "fill",
      className: styles.btn
    }, "Open Template", /*#__PURE__*/React.createElement(Icon, {
      type: "external-link",
      className: styles.external
    }))));
  }));
};

export default SheetsTemplates;