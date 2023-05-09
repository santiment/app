import React, { useMemo } from 'react';
import cx from 'classnames';
import Panel from '@santiment-network/ui/Panel';
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader';
import SmoothDropdown from '../../SmoothDropdown/SmoothDropdown';
import Table from '../../../ducks/Table';
import { COLUMNS, DEFAULT_SORTING } from './columns';
import styles from './index.module.css';

const TransactionTable = ({
  header,
  data,
  slug,
  className,
  tableClassName,
  loading
}) => {
  const El = useMemo(() => {
    return header ? PanelWithHeader : Panel;
  }, [header]);
  const availableColumns = useMemo(() => {
    if (slug === 'bitcoin') {
      return COLUMNS.filter(({
        accessor
      }) => accessor !== 'fromAddress');
    }

    return COLUMNS;
  }, [data, slug]);
  return /*#__PURE__*/React.createElement(El, {
    header: header,
    className: cx(styles.wrapper, className),
    contentClassName: styles.panel
  }, /*#__PURE__*/React.createElement(SmoothDropdown, {
    verticalMotion: true
  }, /*#__PURE__*/React.createElement(Table, {
    data: data,
    columns: availableColumns,
    options: {
      sortingSettings: {
        defaultSorting: DEFAULT_SORTING,
        allowSort: true
      },
      stickySettings: {
        isStickyHeader: true
      },
      loadingSettings: {
        isLoading: loading,
        repeatLoading: 6
      }
    },
    className: cx(className, tableClassName)
  })));
};

export default TransactionTable;