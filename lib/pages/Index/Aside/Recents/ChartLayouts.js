import React, { useMemo } from 'react';
import gql from 'graphql-tag';
import Recent, { getItemBuilder, Column } from './Recent';
import { getSEOLinkFromIdAndTitle } from '../../../../components/Insight/utils';

const getLink = ({
  id,
  title
}) => `/san-studio/lib/${id && getSEOLinkFromIdAndTitle(id, title)}`;

const getItem = getItemBuilder(gql`
  query chartConfiguration($id: Int!) {
    item: chartConfiguration(id: $id) {
      id
      title
    }
  }
`);

const ChartLayout = ({
  title
}) => title ? /*#__PURE__*/React.createElement(Column, null, title) : null;

const ChartLayouts = ({
  ids,
  setHeight
}) => {
  const idsArray = useMemo(() => ids.map(obj => typeof obj === 'string' ? +obj : +obj.id), [ids]);
  return /*#__PURE__*/React.createElement(Recent, {
    rightHeader: "",
    ids: idsArray,
    getItem: getItem,
    getLink: getLink,
    Item: ChartLayout,
    setHeight: setHeight
  });
};

export default ChartLayouts;