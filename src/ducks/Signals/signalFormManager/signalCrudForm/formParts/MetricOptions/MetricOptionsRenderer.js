import React from 'react'
import styles from './MetricOptionsRenderer.module.scss'

const MetricOptionsRenderer = ({
  focusedOption,
  focusedOptionIndex,
  focusOption,
  key,
  labelKey,
  option,
  optionIndex,
  options,
  selectValue,
  style,
  valueArray,
  valueKey
}) => {
  const classNames = [styles.option]

  if (option.type === 'header') {
    classNames.push(styles.header)

    return (
      <div className={classNames.join(' ')} key={key} style={style}>
        {option.label}
      </div>
    )
  }

  if (option === focusedOption) {
    classNames.push(styles.focused)
  }
  if (valueArray.indexOf(option) >= 0) {
    classNames.push(styles.selected)
  }

  return (
    <div
      className={classNames.join(' ')}
      key={key}
      onClick={() => selectValue(option)}
      onMouseEnter={() => focusOption(option)}
      style={style}
    >
      {option.label}
    </div>
  )
}

export default MetricOptionsRenderer
