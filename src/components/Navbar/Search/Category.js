import React, { useEffect } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import styles from './Category.module.scss'

// eslint-disable-next-line
const Title = props => <h3 className={styles.title} {...props} />
export const Button = ({ As = Link, ...props }) => (
  <As {...props} className={styles.button} />
)

const Category = ({
  children,
  className,
  title,
  items,
  Item,
  propsAccessor,
  isLoading,
  registerCursorColumn
}) => {
  useEffect(() => registerCursorColumn(title, items), [items])

  return (
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
}

export default Category
