import React, { Component } from 'react';
import _ from 'lodash';
import { responseChecker } from '../helper';
import './Searchbar.css';

class Searchbar extends Component {
  constructor(props) {
    super(props)
    this.debounce = _.debounce(this.searchWeather, 1500)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    e.persist()
    this.debounce(e)
  }

  async searchWeather(e) {
    let searchValue = e.target.value

    if (!searchValue) return

    await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&APPID=fb1158dc7dfef5f0967ceac8f71ee3a6&units=${this.props.unit}`)
      .then(responseChecker)
      .then(res => this.props.searchCity(res))
      .catch(error => this.props.searchCity(error.status))
    
      document.querySelector('input').value = "";
  }

  render() {
    return (
      <div>
        <input
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default Searchbar