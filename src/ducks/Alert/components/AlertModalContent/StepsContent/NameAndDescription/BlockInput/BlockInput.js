import React from 'react'
import Block from '../../Block/Block'
import styles from './BlockInput.module.scss'

const BlockInput = ({ label, value, onChange, blockClassname, ...rest }) => (
  <Block label={label} className={blockClassname}>
    <textarea
      value={value}
      onChange={onChange}
      className={styles.textarea}
      {...rest}
    />
  </Block>
)

export default BlockInput
