import React from 'react'
import DarkTooltip from '../../../../../../components/Tooltip/DarkTooltip'
import styles from './index.module.scss'

const Suggestions = ({ hints, onSuggestionClick }) => {
  return hints ? (
    <div className={styles.suggestions}>
      Suggestions:
      {hints.map(({ label, description, ...props }, idx) =>
        description ? (
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
        ) : (
          <span
            key={idx}
            className={styles.hint}
            onClick={() => onSuggestionClick(props)}
          >
            {label}
          </span>
        )
      )}
    </div>
  ) : null
}

export default Suggestions
