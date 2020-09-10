import React from 'react'
import styles from './Suggestions.module.scss'

const Title = props => <h3 className={styles.title} {...props} />

const Button = props => <button {...props} className={styles.button} />

const Category = ({ title, items, Item, keyAccessor }) => {
  return (
    <div className={styles.category}>
      <Title>{title}</Title>
      {items.map(item => (
        <Button key={keyAccessor(item)}>
          <Item {...item} />
        </Button>
      ))}
    </div>
  )
}

export default Category
