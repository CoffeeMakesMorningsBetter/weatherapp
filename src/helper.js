function responseChecker(response) {
  if (!response.ok) {
    throw response
  }
  return response.json()
}

function get5Day(arr) {
  let fiveday = []
  for(let i = 0; i < 33; i+=8) {
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
    return { dt, temp, temp_max, temp_min, description, main, idx:idx, url: setWeather(id), id }
  })
}

function setWeather(code) {
  if (code > 199 && code < 300) return "https://ssl.gstatic.com/onebox/weather/48/thunderstorms.png" // thunder
  if (code > 299 && code < 400) return "https://ssl.gstatic.com/onebox/weather/48/rain_light.png" // drizzle
  if (code > 399 && code < 503) return "https://ssl.gstatic.com/onebox/weather/48/rain_s_cloudy.png" // rain
  if (code > 502 && code < 601) return "https://ssl.gstatic.com/onebox/weather/64/snow_light.png" // snow
  if (code > 599 && code < 700) return "https://ssl.gstatic.com/onebox/weather/64/fog.png"// atmosphiric
  if (code === 800) return "https://ssl.gstatic.com/onebox/weather/48/sunny.png" // clear
  if (code > 800) return "https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png" // clouds
}

function setBackground(code) {
  if (code > 199 && code < 502) return ["http://pngimg.com/uploads/rain/rain_PNG13459.png"]
  if (code > 501 && code < 601) return ["https://pngtree.com/freepng/transparent-snowflake-material_3475730.html", null]
  if (code > 599 && code < 801) return ["http://pngimg.com/uploads/cloud/cloud_PNG32.png", "http://pngimg.com/uploads/cloud/cloud_PNG24.png",null]
  if (code > 800) return []
}

export {
  responseChecker,
  createDate,
  cleanUpWeatherData,
  setWeather,
  setBackground
}