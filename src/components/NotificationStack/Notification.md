### Usage instruction

To trigger a notification you need to use to `showNotification` function from the [rootActions.js](/src/actions/rootActions.js)

Following is the jsdoc for the same:

```jsdoc
  This function triggers a notification.

  @param {object} payload notification metadata
  @param {string} payload.title Notification title
  @param {string} payload.description Notification description
  @param {string} payload.variant one of (info|warning|success|error)
  @param {number} payload.dismissAfter Notification dismissal timeout in ms
  @param {string} actoins[].label Label for the action button
  @param {callback} actoins[].onClick Callback when button is clicked
```
