import React from 'react'
import Checkboxes from '@santiment-network/ui/Checkboxes'
import Selector from '@santiment-network/ui/Selector/Selector'
import Icon from '@santiment-network/ui/Icon'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Button from '@santiment-network/ui/Button'
import Calendar from '../../components/Calendar/Calendar'
import SearchProjects from '../../components/Search/SearchProjects'
import ShareModalTrigger from '../../components/Share/ShareModalTrigger'
import styles from './ChartPage.module.scss'

const ChartSettings = ({
  onTimerangeChange,
  defaultTimerange,
  onSlugSelect,
  onCalendarChange,
  generateShareLink,
  onNightModeSelect,
  hasNightMode,
  disabledMetrics
}) => {
  const shareLink = generateShareLink(disabledMetrics)
  return (
    <div className={styles.settings}>
      <SearchProjects
        onSuggestionSelect={onSlugSelect}
        className={styles.search}
        suggestionsProps={{ style: { zIndex: 5 } }}
      />
      <ContextMenu
        passOpenStateAs='isActive'
        position='bottom'
        trigger={
          <Button variant='flat'>
            <Icon type='calendar' />
          </Button>
        }
      >
        <Calendar onChange={onCalendarChange} selectRange />
      </ContextMenu>
      <Selector
        options={['1w', '1m', '3m', '6m']}
        onSelectOption={onTimerangeChange}
        defaultSelected={defaultTimerange}
      />

      <Checkboxes
        options={['Night mode']}
        defaultSelectedIndexes={hasNightMode && ['Night mode']}
        onSelect={onNightModeSelect}
      />
      <ShareModalTrigger
        shareLink={shareLink}
        extraShare={[
          {
            value: `<iframe frameborder="0" height="340" src="${shareLink}"></iframe>`,
            label: 'Copy iframe'
          }
        ]}
      />
    </div>
  )
}

export default ChartSettings
