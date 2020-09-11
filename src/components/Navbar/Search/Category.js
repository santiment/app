import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './Suggestions.module.scss'

const Title = props => <h3 className={styles.title} {...props} />

export const Button = props => <Link {...props} className={styles.button} />

const Category = ({
  className,
  title,
  items,
  Item,
  propsAccessor,
  isLoading,
  children
}) => (
  <div className={cx(styles.category, className)}>
    <Title>
      {title}
      {isLoading && <div className={styles.loader} />}
    </Title>
    {items.map(item => (
      <Button {...propsAccessor(item)}>
        <Item {...item} />
      </Button>
    ))}
    {children}
  </div>
)

export default Category
