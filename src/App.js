import React, { Component } from 'react';
import Searchbar from './component/Searchbar';
import Display from './component/Display';
import FiveDayForecast from './component/FiveDayForecast';
import FiveDayIndividual from './component/FiveDayIndividual';
import { responseChecker, createDate, cleanUpWeatherData } from './helper';

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
      error: false,
      idx: 0,
      unit: "imperial"
    }
    this.searchCity = this.searchCity.bind(this)
    this.updateDisplay = this.updateDisplay.bind(this)
  }

  async componentDidMount() {
    await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.searchterm}&APPID=fb1158dc7dfef5f0967ceac8f71ee3a6&units=${this.state.unit}`)
      .then(responseChecker)
      .then(res => this.setState({
        searchterm: res.city.name,
        days: cleanUpWeatherData(res.list),
        temp: res.list[0].main.temp,
        maxTemp: res.list[0].main.temp_min,
        minTemp: res.list[0].main.temp_max,
        weatherCondition: res.list[0].weather[0].description,
        date: createDate(res.list[0].dt),
        idx: 0
      }))
      .catch(error => this.setState({ error: true }))
  }

  updateDisplay(idx) {
    console.log(idx)
    this.setState({
      temp: this.state.days[idx].temp,
      maxTemp: this.state.days[idx].temp_min,
      minTemp: this.state.days[idx].temp_max,
      weatherCondition: this.state.days[idx].description,
      date: createDate(this.state.days[idx].dt),
      idx
    })
  }

  renderFiveDay = (temp) => {
    return (
      <FiveDayIndividual
        updateDisplay={this.updateDisplay}
        dt={temp.dt}
        main={temp.main}
        max_temp={temp.temp_max}
        min_temp={temp.temp_min}
        key={temp.idx}
        idx={temp.idx}
      />
    )
  }

  searchCity(res){
    if(res > 399) {
      this.setState({ error: true })
    } else {
      this.setState({
        searchterm: res.city.name,
        days: cleanUpWeatherData(res.list),
        temp: res.list[0].main.temp,
        maxTemp: res.list[0].main.temp_min,
        minTemp: res.list[0].main.temp_max,
        weatherCondition: res.list[0].weather[0].description,
        date: createDate(res.list[0].dt),
        error: false,
        idx: 0
      })
    }
  }

  render() {
    let fiveday = this.state.days.map(this.renderFiveDay)
    console.log(fiveday)
    return (
      <div className="App">
        <Searchbar searchCity={this.searchCity}/>
        {this.state.error && <h1>Nothing matches that search</h1>}
        <Display {...this.state}/>
        <FiveDayForecast fiveday={fiveday}/>
      </div>
    );
  }
}



export default App;
