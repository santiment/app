import React, { useState } from 'react'
import cx from 'classnames'
import Tooltip from '@santiment-network/ui/Tooltip'
import Icon from '@santiment-network/ui/Icon'
import { useAddressLabels } from '../hooks'
import styles from './Labels.module.scss'

// eslint-disable-next-line
const WriteLabel = ({ name = '' }) => {
  const [value, setValue] = useState(name)
  const [isFocused, setIsFocused] = useState()

  function onInput ({ target }) {
    setValue(target.textContent)
  }

  return (
    <div
      className={cx(
        styles.label,
        styles.write,
        isFocused && styles.write_focused,
        !value && styles.empty
      )}
    >
      <div
        contentEditable
        className={cx(styles.input)}
        value={value}
        onInput={onInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <div className={styles.close}>
        <Icon type='close-small' />
      </div>
    </div>
  )
}

// eslint-disable-next-line
const NewLabel = () => (
  <div className={cx(styles.label, styles.new)}>
    <Icon type='plus' />
  </div>
)

export const Label = ({ name, origin, className, forwardedRef, ...props }) => (
  <div
    {...props}
    key={name}
    className={cx(
      styles.label,
      className,
      origin === 'santiment' && styles.san
    )}
    ref={forwardedRef}
  >
    {name}
  </div>
)

export const CollapsedTooltip = props => (
  <Tooltip {...props} on='click' className={styles.collapsed__tooltip} />
)

export const CollapsedLabels = ({ labels }) => (
  <CollapsedTooltip
    on='click'
    className={styles.collapsed__tooltip}
    trigger={
      <Label
        className={styles.collapsed}
        name={`+${labels.length}`}
        origin='santiment'
      />
    }
  >
    {labels.map(Label)}
  </CollapsedTooltip>
)

const Labels = ({ settings, showCount = 5 }) => {
  const labels = useAddressLabels(settings)
  const visibleLabels = labels.slice(0, showCount)
  const hiddenLabels = labels.slice(showCount)
  return (
    <div className={styles.wrapper}>
      {visibleLabels.map(Label)}
      {!!hiddenLabels.length && <CollapsedLabels labels={hiddenLabels} />}
    </div>
  )
}

export default Labels
