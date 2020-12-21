import React, { useMemo } from 'react'
import { compose } from 'redux'
import Table from 'react-table-6'
import cx from 'classnames'
import withSizes from 'react-sizes'
import { connect } from 'react-redux'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import { mapSizesToProps } from '../../../utils/withSizes'
import {
  getTrGroupProps,
  getTrendsCompatctViewCols,
  getTrendsDesktopCols,
  getTrendsMobileCols
} from './columns'
import styles from './TrendsTable.module.scss'

const TrendsTable = ({
  trendWords = [],
  TrendToInsights,
  trendConnections = [],
  header = '',
  small,
  volumeChange,
  className,
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
          rawWordChart: word,
          score: score,
          volume: volumeChange[word],
          wordCloud: word
        }
      }),
    [trendWords, volumeChange]
  )

  const columns = useMemo(
    () => {
      const baseColumns = isDesktop
        ? getTrendsDesktopCols({ trendConnections, TrendToInsights })
        : getTrendsMobileCols({ trendConnections })

      return isCompactView
        ? getTrendsCompatctViewCols({ trendConnections })
        : small
          ? baseColumns.slice(0, 2)
          : baseColumns
    },
    [small, trendConnections, TrendToInsights, isCompactView]
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
  hypedTrends: { volumeChange, TrendToInsights }
}) => ({
  volumeChange,
  TrendToInsights
})

export default compose(
  connect(mapStateToProps),
  withSizes(mapSizesToProps)
)(TrendsTable)
