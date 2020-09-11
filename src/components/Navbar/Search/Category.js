import React from 'react'
import styles from './Suggestions.module.scss'
import { Link } from 'react-router-dom'

const Title = props => <h3 className={styles.title} {...props} />

export const Button = props => <Link {...props} className={styles.button} />

const Category = ({ title, items, Item, propsAccessor, children }) => {
  return (
    <div className={styles.category}>
      <Title>{title}</Title>
      {items.map(item => (
        <Button
          // key={keyAccessor(item)} to={hrefAccessor(item)}
          {...propsAccessor(item)}
        >
          <Item {...item} />
        </Button>
      ))}
      {children}
    </div>
  )
}

export default Category
