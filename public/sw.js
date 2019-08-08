const ACTIVITIES_LOAD_TIMEOUT = 10000;
const PUBLIC_API_ROUTE = 'https://api-stage.santiment.net'
const PUBLIC_ROUTE = 'https://app-stage.santiment.net'
const WS_DB_NAME = 'WSdb'
const ACTIVITY_CHECKS_STORE_NAME = 'activityChecks'

let db;

const createActivityChecksTable = () => {
  if (db && !db.objectStoreNames.contains(ACTIVITY_CHECKS_STORE_NAME)) {
    db.createObjectStore(ACTIVITY_CHECKS_STORE_NAME, {
      keyPath: 'id',
      autoIncrement: true
    });
  }
}

const createDB = () => {
  if(db){
    return;
  }

  var request = indexedDB.open(WS_DB_NAME);
  request.onerror = function (event) {
    console.log('The database is opened failed');
  };
  request.onsuccess = function (event) {
    db = request.result;
    createActivityChecksTable()
    console.log('The database is opened successfully');
  };
  request.onupgradeneeded = function(event) {
    db = event.target.result;
    createActivityChecksTable()
  }
}

function readDb(storeName, checkCallback) {
  if(!db){
    return;
  }

  var transaction = db.transaction([storeName]);
  var objectStore = transaction.objectStore(storeName);
  var request = objectStore.get(1);

  request.onerror = function(event) {
    console.log('Transaction failed', event);
  };

  request.onsuccess = function( event) {
    console.log("---->event", request.result)
    checkCallback(request.result)
  };
}

function removeFromDb(storeName, checkCallback) {
  if(!db){
    return
  }

  var request = db.transaction([storeName], 'readwrite')
    .objectStore(storeName)
    .delete(1);

  request.onsuccess = function (event) {
    console.log('The data has been deleted successfully');
    checkCallback()
  };
}

function addToDb(storeName, data, checkCallback) {
  if(!db){
    return
  }

  var request = db.transaction([storeName], 'readwrite')
    .objectStore(storeName)
    .add(data);

  request.onsuccess = function (event) {
    console.log('The data has been written successfully');
    checkCallback();
  };

  request.onerror = function (event) {
    console.log('The data has been written failed', event);
    checkCallback();
  }
}

self.addEventListener('activate', function(event) {
  event.waitUntil(
    createDB()
  );
});

const restart = () => {
  setTimeout(loadAndCheckActivities, ACTIVITIES_LOAD_TIMEOUT)
}

const checkNewActivities = (activities) => {

  if(activities && activities.length > 0){
    const lastTriggeredAt = activities[0].triggeredAt;

    if(lastTriggeredAt){
      const triggeredData = new Date(lastTriggeredAt);

      readDb(ACTIVITY_CHECKS_STORE_NAME, (data) => {

        if(data){
          const showNotification = () => {
            self.registration.showNotification('New ' + activities.length +' sonar feed activities!', {
              body: 'Open to check ' + PUBLIC_ROUTE + '/sonar/feed/activity',
              badge: '/favicon-96x96.png',
              icon: '/favicon-96x96.png',
              vibrate: [200, 100, 200, 100],
              tag: 'vibration-sample',
              timestamp:  new Date()
            })
            restart()
          }

          const isSame = new Date(data.triggeredAt).getTime() === triggeredData.getTime();
          if(isSame) {
            restart()
          } else {
            removeFromDb(ACTIVITY_CHECKS_STORE_NAME, showNotification)
          }

        } else {
          addToDb(ACTIVITY_CHECKS_STORE_NAME, {
            triggeredAt: triggeredData
          }, restart)
        }
      })

    }
  }
}

const loadAndCheckActivities = () => {
  const from = new Date();

  const query = {
    operationName: "signalsHistoricalActivity",
    query: 'query signalsHistoricalActivity($datetime: DateTime!) {  activities: signalsHistoricalActivity(limit: 5, cursor: {type: BEFORE, datetime: $datetime}) {    cursor {      before      after      __typename    }    activity {      payload      triggeredAt      userTrigger {        trigger {          title          description          __typename        }        __typename      }      __typename    }    __typename  }}',
    variables: {datetime: from.toISOString()}
  }

  fetch(PUBLIC_API_ROUTE + `/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'accept': '*/*' },
    body: JSON.stringify(query),
    credentials: 'include'
  })
    .then(res => res.json())
    .then((res) => {

      const { data: { activities: { activity } = {} } } = res

      if(activity){
        checkNewActivities(activity)
      }
    })
    .catch(error => {
      console.log(error)
    })
}

self.addEventListener('message', function(event){
  const {type, data} = event.data

  if(type && type === 'SONAR_FEED_ACTIVITY'){
    addToDb(ACTIVITY_CHECKS_STORE_NAME, {
      triggeredAt: data.lastTriggeredAt
    }, restart)
  }
});

createDB()
loadAndCheckActivities();
