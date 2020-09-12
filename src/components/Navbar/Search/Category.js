import React, { useEffect } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import styles from './Category.module.scss'

// eslint-disable-next-line
const Title = props => <h3 className={styles.title} {...props} />

export const Button = ({ className, As = Link, isCursored, ...props }) => (
  <As
    {...props}
    className={cx(
      styles.button,
      className,
      isCursored && styles.button_cursored
    )}
  />
)

const Category = ({
  className,
  title,
  items,
  Item,
  cursor: { row: cursorRow, columnName },
  propsAccessor,
  isLoading,
  registerCursorColumn
}) => {
  const isCursoredColumn = columnName === title

  useEffect(() => registerCursorColumn(title, items), [items])
  useEffect(() => () => registerCursorColumn(title, []), [])

  return (
    <div data-column={title} className={cx(styles.category, className)}>
      <Title>
        {title}
        {isLoading && <div className={styles.loader} />}
      </Title>
      {items.map((item, i) => (
        <Button
          {...propsAccessor(item)}
          isCursored={isCursoredColumn && i === cursorRow}
        >
          <Item {...item} />
        </Button>
      ))}
    </div>
  )
}

export default Category
