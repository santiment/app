import React, { useMemo } from 'react'
import { compose } from 'redux'
import Table from 'react-table-6'
import cx from 'classnames'
import withSizes from 'react-sizes'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import { store } from '../../../redux'
import { mapSizesToProps } from '../../../utils/withSizes'
import {
  TRENDS_COMPACT_VIEW_COLUMNS,
  TRENDS_DESKTOP_COLUMNS,
  TRENDS_MOBILE_COLUMNS
} from './columns'
import styles from './TrendsTable.module.scss'

const getTrGroupProps = (_, rowInfo) => {
  return {
    onClick: ({ target, currentTarget, ctrlKey, metaKey }) => {
      if (ctrlKey || metaKey) {
        return
      }

      let node = target
      while (node && node !== currentTarget) {
        if (
          node.classList &&
          (node.classList.contains(styles.tooltip) ||
            node.classList.contains(styles.action) ||
            node.classList.contains(styles.checkbox))
        ) {
          return
        }
        node = node.parentNode
      }
      store.dispatch(push(`/labs/trends/explore/${rowInfo.original.rawWord}`))
    }
  }
}

const TrendsTable = ({
  trendWords = [],
  TrendToInsights,
  allTrends,
  connectTrends,
  clearConnectedTrends,
  selectable = true,
  selectedTrends = new Set(),
  trendConnections = [],
  connectedTrends = {},
  header = '',
  small,
  volumeChange,
  className,
  isLoggedIn,
  username,
  selectTrend,
  isDesktop,
  isCompactView,
  contentClassName
}) => {
  const tableData = useMemo(
    () =>
      trendWords.map(({ word, score }, index) => {
        return {
          index: index + 1,
          word: word,
          rawWord: word,
          score: score,
          volume: volumeChange[word],
          wordCloud: word
        }
      }),
    [trendWords, volumeChange]
  )

  const commonProps = {
    selectable,
    selectTrend,
    selectedTrends,
    username,
    isCompactView,
    isLoggedIn,
    trendConnections
  }

  const baseColumns = isDesktop
    ? TRENDS_DESKTOP_COLUMNS({ ...commonProps, TrendToInsights })
    : TRENDS_MOBILE_COLUMNS({ trendConnections, TrendToInsights })

  const columns = useMemo(
    () => {
      return isCompactView
        ? TRENDS_COMPACT_VIEW_COLUMNS({ ...commonProps })
        : small
          ? baseColumns.slice(0, 2)
          : baseColumns
    },
    [isCompactView, small, baseColumns]
  )

  return (
    <PanelWithHeader
      header={header}
      className={cx(
        styles.panel,
        className,
        isCompactView && styles.panel__compact
      )}
      contentClassName={cx(
        styles.content,
        isCompactView && styles.content__compact,
        contentClassName
      )}
      headerClassName={cx(
        styles.header,
        !header && styles.header__empty,
        isCompactView && styles.header__compact
      )}
    >
      <Table
        className={cx(styles.table, isCompactView && styles.compact)}
        sortable={false}
        resizable={false}
        data={tableData}
        columns={columns}
        showPagination={false}
        defaultPageSize={10}
        minRows={10}
        getTrGroupProps={getTrGroupProps}
      />
    </PanelWithHeader>
  )
}

const mapStateToProps = ({
  hypedTrends: { volumeChange, TrendToInsights },
  user: {
    data: { username }
  }
}) => ({
  volumeChange,
  TrendToInsights,
  username
})

export default compose(
  connect(mapStateToProps),
  withSizes(mapSizesToProps)
)(TrendsTable)
