import React, { Component } from 'react';
import Searchbar from './component/Searchbar';
import Display from './component/Display';
import FiveDayForecast from './component/FiveDayForecast';
import FiveDayIndividual from './component/FiveDayIndividual';
import Modal from './component/Modal'
import Map from './component/Map';
import { responseChecker, cleanUpWeatherData, setWeather } from './helper';
import './App.css';
import './component/Modal.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchterm: "San Francisco",
      days: [],
      weatherCondition: "",
      temp: "",
      maxTemp: "",
      minTemp: "",
      date: "",
      error: false,
      showModal: false,
      idx: 0,
      unit: "metric"
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
    await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.searchterm}&APPID=fb1158dc7dfef5f0967ceac8f71ee3a6&units=${this.state.unit}`)
      .then(responseChecker)
      .then(res => this.setState({
        searchterm: res.city.name,
        days: cleanUpWeatherData(res.list),
        temp: res.list[0].main.temp,
        maxTemp: res.list[0].main.temp_min,
        minTemp: res.list[0].main.temp_max,
        weatherCondition: res.list[0].weather[0].description,
        url: setWeather(res.list[0].weather[0].id),
        date: res.list[0].dt,
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
        days: cleanUpWeatherData(res.list),
        temp: res.list[0].main.temp,
        maxTemp: res.list[0].main.temp_min,
        minTemp: res.list[0].main.temp_max,
        weatherCondition: res.list[0].weather[0].description,
        url: setWeather(res.list[0].weather[0].id),
        date: res.list[0].dt,
        error: false,
        idx: 0
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
        <img src="https://ssl.gstatic.com/onebox/weather/48/thunderstorms.png" alt="storms" />
        <Searchbar searchCity={this.searchCity} />
        <Display {...this.state} toggle={this.toggle} />
        <FiveDayForecast fiveday={fiveday} />
        {this.state.error ? (
            <Modal>
              <div onClick={this.toggleModal}>
                <h1>Nothing Matches that search. Please enter a valid city name</h1>
              </div>
            </Modal>
        ) : null}
      </div>
    );
  }
}



export default App;
