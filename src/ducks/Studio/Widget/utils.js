let widgetId = -1

export const newId = () => ++widgetId

export const newWidget = (Widget, props) =>
  Object.assign(
    {
      Widget,
      id: newId(),
      chartRef: { current: null }
    },
    props
  )
