import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import { withExternal } from './utils'
import TopExchangesTable from '../../../components/Tables/TopExchanges'
import styles from '../index.module.scss'

const Widget = withExternal(TopExchangesTable)
const TopExchangesTableWidget = ({ target, widget, settings }) => (
  <Widget
    isForcedLoading
    target={target}
    slug={settings.slug}
    skip={settings.slug === 'bitcoin'}
    ticker={settings.ticker}
    titleClassName={styles.exchanges__title}
    titleChildren={
      <Icon
        type='close-medium'
        className={styles.close}
        onClick={widget.deleteWithHistory || widget.delete}
      />
    }
  />
)

export default TopExchangesTableWidget
