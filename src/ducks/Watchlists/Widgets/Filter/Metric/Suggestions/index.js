import React from 'react'
import DarkTooltip from '../../../../../../components/Tooltip/DarkTooltip'
import styles from './index.module.scss'

const Suggestions = ({ hints, onSuggestionClick }) => {
  return hints ? (
    <div className={styles.suggestions}>
      Examples:
      {hints.map(({ label, description, ...props }, idx) => (
        <DarkTooltip
          key={idx}
          position='bottom'
          align='center'
          on='hover'
          className={styles.tooltip}
          trigger={
            <span
              className={styles.hint}
              onClick={() => onSuggestionClick(props)}
            >
              {label}
            </span>
          }
        >
          {description}
        </DarkTooltip>
      ))}
    </div>
  ) : null
}

export default Suggestions
