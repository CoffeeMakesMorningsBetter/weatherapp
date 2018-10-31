function responseChecker(response) {
  if (!response.ok) {
    throw response
  }
  return response.json()
}

function get5Day(arr) {
  let fiveday = []
  for(let i = 0; i < 25; i+=8) {
    console.log(i)
    fiveday.push(arr[i])
  }
  return fiveday
}

function createDate(val) {
  let map = {
    0: "Monday",
    1: "Tuesday",
    2: "Wednesday",
    3: "Thursday",
    4: "Friday",
    5: "Saturday",
    7: "Sunday"
  }
  let date = new Date(val * 1000)
  let day = date.getDate()
  let month = date.getMonth()
  let year = date.getFullYear()
  let weekday = map[date.getDay()]
  return {weekday, month, day, year}
}

function cleanUpWeatherData(arr) {
  let five = get5Day(arr)
  return five.slice(0,6).map((day, idx) => {
    let { dt } = day 
    let { temp, temp_max, temp_min } = day.main
    let { description, main } = day.weather[0]
    return { dt, temp, temp_max, temp_min, description, main, idx:idx }
  })
}

export {
  responseChecker,
  createDate,
  cleanUpWeatherData
}