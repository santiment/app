const CUSTOM_BLA_BLA = process.env.REACT_APP_BACKEND_URL
const ACTIVITIES_LOAD_TIMEOUT = 10000
const PUBLIC_API_ROUTE = 'https://api-stage.santiment.net'
const PUBLIC_ROUTE = 'https://app-stage.santiment.net'
const WS_DB_NAME = 'serviceWorkerDb'
const ACTIVITY_CHECKS_STORE_NAME = 'activityChecks'

console.log(CUSTOM_BLA_BLA)
console.log('SAN service worker started')

let db

const createActivityChecksTable = () => {
  if (db && !db.objectStoreNames.contains(ACTIVITY_CHECKS_STORE_NAME)) {
    db.createObjectStore(ACTIVITY_CHECKS_STORE_NAME, {
      keyPath: 'id',
      autoIncrement: true
    })
  }
}

const createDB = () => {
  if (db) {
    return
  }

  var request = indexedDB.open(WS_DB_NAME)
  request.onerror = function (event) {
    console.log('The database is opened failed')
  }
  request.onsuccess = function (event) {
    db = request.result
    createActivityChecksTable()
    console.log('The database is opened successfully')
  }
  request.onupgradeneeded = function (event) {
    db = event.target.result
    createActivityChecksTable()
  }
}

function getFirstValueFromTable (storeName, checkCallback) {
  if (!db) {
    return
  }

  var transaction = db.transaction([storeName])
  var objectStore = transaction.objectStore(storeName)

  var cursorRequest = objectStore.openCursor()

  cursorRequest.onsuccess = function (event) {
    var cursor = event.target.result
    if (cursor) {
      checkCallback(cursor.value)
    }
  }

  cursorRequest.onerror = function (event) {
    console.log('IndexDB cursor failed', event)
  }
}

function removeFromDb (storeName, checkCallback) {
  if (!db) {
    return
  }

  var request = db
    .transaction([storeName], 'readwrite')
    .objectStore(storeName)
    .clear()

  request.onsuccess = function (event) {
    checkCallback()
  }
  request.onerror = function () {
    console.log('Error during clear IndexDb store')
  }
}

function addToDb (storeName, data, checkCallback) {
  if (!db) {
    return
  }

  var request = db
    .transaction([storeName], 'readwrite')
    .objectStore(storeName)
    .add(data)

  request.onsuccess = function (event) {
    checkCallback && checkCallback()
  }

  request.onerror = function (event) {
    console.log('The data has been written failed', event)
    checkCallback && checkCallback()
  }
}

const restart = () => {
  setTimeout(loadAndCheckActivities, ACTIVITIES_LOAD_TIMEOUT)
}

const addActivityDateAndRestart = (triggeredAt, newCount, enabled) => {
  addToDb(
    ACTIVITY_CHECKS_STORE_NAME,
    {
      triggeredAt: triggeredAt,
      count: newCount
    },
    enabled ? restart : undefined
  )
}

const showActivitiesNotification = (triggeredAt, newCount) => {
  self.registration.showNotification(newCount + ' new activities in Sonar!', {
    body: 'Open to check ' + PUBLIC_ROUTE + '/sonar/activity',
    badge: '/favicon-96x96.png',
    icon: '/favicon-96x96.png',
    vibrate: [200, 100, 200, 100],
    tag: 'vibration-sample',
    timestamp: new Date()
  })

  addActivityDateAndRestart(triggeredAt, newCount, true)
}

const checkNewActivities = activities => {
  if (activities && activities.length > 0) {
    const loadedTriggeredAt = new Date(activities[0].triggeredAt)

    if (loadedTriggeredAt) {
      getFirstValueFromTable(ACTIVITY_CHECKS_STORE_NAME, data => {
        if (data) {
          const lastSavedTriggeredTime = new Date(data.triggeredAt).getTime()
          const count = activities.reduce((acc, item) => {
            if (new Date(item.triggeredAt).getTime() > lastSavedTriggeredTime) {
              acc++
            }
            return acc
          }, 0)

          console.log('new count: ' + count)

          const isSame =
            loadedTriggeredAt.getTime() === lastSavedTriggeredTime &&
            data.count === count
          if (isSame) {
            console.log('the same date in DB: ' + loadedTriggeredAt)
            self.registration.showNotification('The same activities :(')
            restart()
          } else {
            console.log('show notification')
            removeFromDb(ACTIVITY_CHECKS_STORE_NAME, () => {
              showActivitiesNotification(loadedTriggeredAt, count)
            })
          }
        } else {
          console.log('no data in db')
          addActivityDateAndRestart(loadedTriggeredAt, 0, true)
        }
      })
    }
  }
}

const loadAndCheckActivities = () => {
  const from = new Date()

  const query = {
    operationName: 'signalsHistoricalActivity',
    query:
      'query signalsHistoricalActivity($datetime: DateTime!) {  activities: signalsHistoricalActivity(limit: 5, cursor: {type: BEFORE, datetime: $datetime}) {    cursor {      before      after      __typename    }    activity {      payload      triggeredAt      userTrigger {        trigger {          title          description          __typename        }        __typename      }      __typename    }    __typename  }}',
    variables: { datetime: from.toISOString() }
  }

  fetch(PUBLIC_API_ROUTE + `/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', accept: '*/*' },
    body: JSON.stringify(query),
    credentials: 'include'
  })
    .then(res => res.json())
    .then(res => {
      const {
        data: { activities: { activity } = {} }
      } = res

      if (activity) {
        checkNewActivities(activity)
      }
    })
    .catch(error => {
      console.log(error)
    })
}

self.addEventListener('activate', function (event) {
  console.log('Activate sw')
  createDB()
  loadAndCheckActivities()
})

self.addEventListener('message', function (event) {
  const { type, data } = event.data

  if (type) {
    if (type === 'SONAR_FEED_ACTIVITY') {
      addActivityDateAndRestart(data.lastTriggeredAt, 0, false)
    }
  }
})
