import React from 'react'
import Block from '../../Block/Block'
import styles from './BlockInput.module.scss'

function BlockInput ({ label, value, onChange, blockClassname, ...rest }) {
  return (
    <Block label={label} className={blockClassname}>
      <textarea
        value={value}
        onChange={onChange}
        className={styles.textarea}
        {...rest}
      />
    </Block>
  )
}

export default BlockInput
