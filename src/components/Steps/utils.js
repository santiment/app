export const getClassString = (styles, disabled, status) =>
  disabled ? styles.disabled : styles[status]
