import React, { Component } from 'react';
import Searchbar from './component/Searchbar';
import Display from './component/Display'

function responseChecker(response) {
  if (!response.ok) {
    throw new Error(response)
  }
  return response
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
  return `${weekday}-${month}-${day}-${year}`
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchterm: "gilroy",
      days: [],
      weatherCondition: "",
      temp: "",
      maxTemp: "",
      minTemp: "",
      date: "",
      error: false
    }
    this.searchCity = this.searchCity.bind(this)
  }

  async componentDidMount() {
    await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.searchterm}&APPID=fb1158dc7dfef5f0967ceac8f71ee3a6&units=metric`)
      .then(responseChecker)
      .then(res => res.json())
      .then(res => this.setState({
        searchterm: res.city.name,
        days: res.list.slice(0, 6),
        temp: res.list[0].main.temp,
        maxTemp: res.list[0].main.temp_min,
        minTemp: res.list[0].main.temp_max,
        weatherCondition: res.list[0].weather[0].description,
        date: createDate(res.list[0].dt)
      }))
      .catch(e => console.log(e))
  }

  searchCity(res){
    if(res === "Not Found") {
      this.setState({ error: true })
    } else {
      this.setState({
        searchterm: res.city.name,
        days: res.list.slice(0, 6),
        temp: res.list[0].main.temp,
        maxTemp: res.list[0].main.temp_min,
        minTemp: res.list[0].main.temp_max,
        weatherCondition: res.list[0].weather[0].description,
        date: createDate(res.list[0].dt),
        error: false
      })
    }
  }

  render() {
    return (
      <div className="App">
        hello world!
        <Searchbar searchCity={this.searchCity}/>
        <Display {...this.state}/>
      </div>
    );
  }
}



export default App;
