/**
 * @typedef {import ('./typedef.js').mainData} mainData
 */

// Define the server URL and check if the application should use mocked data
const server = "http://localhost:3000/user";
const useMockedData = window.location.search.includes("mockedData");

// Initialize an object to store mocked data if it is used
let mockedData = {
  USER_MAIN_DATA: {},
  USER_ACTIVITY: {},
  USER_AVERAGE_SESSIONS: {},
  USER_PERFORMANCE: {},
};

// If using mocked data, call the importMockedData function to import it
// if (useMockedData) importMockedData();

/**
 * Fetch data from the backend server.
 * @param {string} endPoint - The endpoint to fetch data from.
 * @returns {Promise<Object>} - The fetched data.
 */
async function importFromBackEnd(endPoint, id) {
  if (endPoint !== "") endPoint = "/" + endPoint;
  const response = await fetch(server + "/" + id + endPoint);
  const data = await response.json();
  return data.data ? data.data : data;
}

/**
 * Import mocked data from the data.js file.
 */
async function importMockedData() {
  mockedData = await import("./data.js");
}

/**
 * Fetches user main data from the server or mocked data.
 * @async
 * @param {Number} userId - The user ID.
 * @returns {mainData} - The user's main data.
 */
async function getUserMainData(id) {
  // Get raw user data, either from the mocked data or from the backend server
  const rawUserData = useMockedData
    ? await getMockedData("USER_MAIN_DATA", id) // If using mocked data, get it from the mocked data source
    : await importFromBackEnd("", id); // If not using mocked data, import it from the backend server

  return rawUserData; // Return the raw user data
}

export { getUserMainData }; // Export the function so it can be used in other parts of the project

/**
 * Fetches user activity data from the server or mocked data.
 * @async
 * @returns {Object} - The user activity data.
 */
async function getUserActivity(id) {
  const rawUserData = useMockedData
    ? await getMockedData("USER_ACTIVITY", id)
    : await importFromBackEnd("activity", id);
  //this line converts the object into an array
  const userData = Object.values(rawUserData);
  //this line gets the second element of the array (the sessions)
  const sessions = userData[1];
  //initialize an object to store the sessions by day
  const sessionsByDay = {};

  // Sum the calories and kilograms for each day
  for (let session of sessions) {
    const day = session.day;
    if (!(day in sessionsByDay)) {
      sessionsByDay[day] = {
        calories: 0,
        kilograms: 0,
      };
    }
    sessionsByDay[day].calories += session.calories;
    if ("kilogram" in session) {
      sessionsByDay[day].kilograms += session.kilogram;
    }
  }
  // Convert the sessionsByDay object into an array of objects for the chart data
  // each object has the day, calories and kilograms
  const chartData = Object.keys(sessionsByDay).map((day) => {
    return {
      day,
      calories: sessionsByDay[day].calories,
      kilograms: sessionsByDay[day].kilograms,
    };
  });

  return chartData;
}
export { getUserActivity };

/**
 * Fetches user average sessions data from the server or mocked data.
 * @async
 * @returns {Array} - The user average sessions data.
 */
async function getUserAverageSessions(id) {
  const rawUserData = useMockedData
    ? await getMockedData("USER_AVERAGE_SESSIONS", id)
    : await importFromBackEnd("average-sessions", id);
  const userData = Object.values(rawUserData); // Transform the object into an array
  return userData;
}

export { getUserAverageSessions };

/**
 * Fetches user performance data from the server or mocked data.
 * @async
 * @returns {Array} - The user performance data.
 */
async function getUserPerformance(id) {
  const rawUserData = useMockedData
    ? await getMockedData("USER_PERFORMANCE", id)
    : await importFromBackEnd("performance", id);
  // const userData = Object.values(rawUserData); // Transform the object into an array
  return rawUserData;
}
export { getUserPerformance };

/**
 * Retrieves mocked data based on the source and user ID.
 * @async
 * @param {string} src - The source of the mocked data.
 * @param {Number} userId - The user ID.
 * @returns {Object} - The mocked data.
 */
async function getMockedData(src, userId) {
  if (Object.keys(mockedData[src]).length === 0) await importMockedData();
  const data = mockedData[src].find((u) => u.userId === parseInt(userId));
  return data;
}


