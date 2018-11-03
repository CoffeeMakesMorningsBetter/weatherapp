import React, { Component } from 'react';
import Searchbar from './component/Searchbar';
import Display from './component/Display';
import FiveDayForecast from './component/FiveDayForecast';
import FiveDayIndividual from './component/FiveDayIndividual';
import Modal from './component/Modal'
import { responseChecker, cleanUpWeatherData, setWeather, setBackground } from './helper';
import './App.css';
import './component/Modal.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchterm: "San Francisco",
      country: "",
      days: [],
      weatherCondition: "",
      temp: "",
      maxTemp: "",
      minTemp: "",
      date: "",
      error: false,
      idx: 0,
      unit: "imperial",
      weather: []
    }
    this.searchCity = this.searchCity.bind(this)
    this.updateDisplay = this.updateDisplay.bind(this)
    this.search = this.search.bind(this)
    this.toggle = this.toggle.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  componentDidMount() {
    this.search()
  }

  toggleModal() {
    this.setState({ error: !this.state.error })
  }

  async search() {
    await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.searchterm}&APPID=fb1158dc7dfef5f0967ceac8f71ee3a6&units=${this.state.unit}&cnt=41`)
      .then(responseChecker)
      .then(res => this.setState({
        searchterm: res.city.name,
        country: res.city.country,
        days: cleanUpWeatherData(res.list),
        temp: res.list[0].main.temp,
        maxTemp: res.list[0].main.temp_min,
        minTemp: res.list[0].main.temp_max,
        weatherCondition: res.list[0].weather[0].description,
        url: setWeather(res.list[0].weather[0].id),
        id: res.list[0].weather[0].id,
        date: res.list[0].dt,
        weather: setBackground(res.list[0].weather[0].id),
        idx: 0
      }))
      .catch(error => this.setState({ error: true }))
  }

  updateDisplay(idx) {
    this.setState({
      temp: this.state.days[idx].temp,
      maxTemp: this.state.days[idx].temp_min,
      minTemp: this.state.days[idx].temp_max,
      weatherCondition: this.state.days[idx].description,
      url: this.state.days[idx].url,
      date: this.state.days[idx].dt,
      id: this.state.days[idx].id,
      weather: setBackground(this.state.days[idx].id),
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
        url={temp.url}
      />
    )
  }

  searchCity(res) {
    if (res > 399) {
      this.setState({ error: true })
    } else {
      this.setState({
        searchterm: res.city.name,
        country: res.city.country,
        days: cleanUpWeatherData(res.list),
        temp: res.list[0].main.temp,
        maxTemp: res.list[0].main.temp_min,
        minTemp: res.list[0].main.temp_max,
        weatherCondition: res.list[0].weather[0].description,
        url: setWeather(res.list[0].weather[0].id),
        id: res.list[0].weather[0].id,
        date: res.list[0].dt,
        weather: setBackground(res.list[0].weather[0].id),
        idx: 0,
        error: false
      })
    }
  }

  toggle() {
    let unit = this.state.unit === "metric" ? "imperial" : "metric"
    this.setState({ unit }, this.search)
  }

  render() {
    let fiveday = this.state.days.map(this.renderFiveDay)
    return (
      <div className="App">
        <div className={(this.state.weather.length > 1)? "cloud": "rain"}><img src={(this.state.weather.length > 1)?"http://pngimg.com/uploads/cloud/cloud_PNG32.png": null}></img></div>
        <div className="cloud1"><img src="http://pngimg.com/uploads/cloud/cloud_PNG24.png"></img></div>
        <div className="search">
          <img src={this.state.url} alt="storms" />
          <Searchbar searchCity={this.searchCity} unit={this.state.unit}/>
          <Display {...this.state} toggle={this.toggle} />
          <FiveDayForecast fiveday={fiveday} />
          {this.state.error ? (
            <Modal>
              <div onClick={this.toggleModal}>
                <h1>Nothing matches that search. Please enter a valid city name</h1>
              </div>
            </Modal>
          ) : null}
        </div>

      </div>
    );
  }
}



export default App;


