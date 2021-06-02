import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import { withExternal } from './utils'
import { isStage } from '../../../utils/utils'
import TopExchangesTable from '../../../components/Tables/TopExchanges'
import styles from '../index.module.scss'

const selector = { watchlistId: isStage ? 1115 : 3985 }

const Widget = withExternal(TopExchangesTable)
const TopExchangesTableWidget = ({ target, widget }) => (
  <Widget
    target={target}
    selector={selector}
    titleClassName={styles.exchanges__title}
    titleChildren={
      <Icon
        type='close-medium'
        className={styles.close}
        onClick={widget.delete}
      />
    }
  />
)

export default TopExchangesTableWidget
