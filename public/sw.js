console.log("Start sw")

const ACTIVITIES_LOAD_TIMEOUT = 1000;

const loadAndCheckActivities = () => {
  const from = new Date();

  const query = {
    operationName: "signalsHistoricalActivity",
    query: 'query signalsHistoricalActivity($datetime: DateTime!) {  activities: signalsHistoricalActivity(limit: 5, cursor: {type: BEFORE, datetime: $datetime}) {    cursor {      before      after      __typename    }    activity {      payload      triggeredAt      userTrigger {        trigger {          title          description          __typename        }        __typename      }      __typename    }    __typename  }}',
    variables: {datetime: from.toISOString()}
  }

  fetch(`https://api-stage.santiment.net/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'accept': '*/*' },
    body: JSON.stringify(query),
    credentials: 'include'
  })
    .then(res => res.json())
    .then((res) => {
      const {data: {activities}} = res
      self.registration.showNotification('New ' + activities.length +' sonar feed activities!', {
        body: 'Buzz! Buzz!',
        icon: '../images/touch/chrome-touch-icon-192x192.png',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: 'vibration-sample'
      })

      setTimeout(loadAndCheckActivities, ACTIVITIES_LOAD_TIMEOUT)
    })
    .catch(error => {
      console.log(error)
    })
}
