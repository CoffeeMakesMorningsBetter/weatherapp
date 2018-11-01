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
    6: "Sunday"
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
    let { description, main, id } = day.weather[0]
    return { dt, temp, temp_max, temp_min, description, main, idx:idx, url: setWeather(id) }
  })
}

function setWeather(code) {
  if (code > 199 && code < 300) return "https://ssl.gstatic.com/onebox/weather/48/thunderstorms.png" // thunder
  if (code > 299 && code < 400) return "https://ssl.gstatic.com/onebox/weather/48/rain_light.png" // drizzle
  if (code > 399 && code < 500) return "https://ssl.gstatic.com/onebox/weather/48/rain_s_cloudy.png" // rain
  if (code > 499 && code < 600) return "https://ssl.gstatic.com/onebox/weather/48/thunderstorms.png" // snow
  if (code > 599 && code < 700) return // atmosphiric
  if (code === 800) return "https://ssl.gstatic.com/onebox/weather/48/sunny.png" // clear
  if (code > 800) return "https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png" // clouds
}

export {
  responseChecker,
  createDate,
  cleanUpWeatherData,
  setWeather
}