import React, { Component } from 'react';
import _ from 'lodash';

function responseChecker(response) {
  console.log(response)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response
}

class Searchbar extends Component {
  constructor(props) {
    super(props)
    this.debounce = _.debounce(this.searchWeather, 2000)
  }

  handleChange(e) {
    e.persist()
    this.debounce(e)
  }

  async searchWeather(e) {
    let searchValue = e.target.value

    if (!searchValue) return

    await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&APPID=fb1158dc7dfef5f0967ceac8f71ee3a6&units=metric`)
      .then(responseChecker)
      .then(res => res.json())
      .then(res => this.props.searchCity(res))
      .catch(error => this.props.searchCity("Not Found"))
    
      document.querySelector('input').value = ""
  }

  render() {
    return (
      <div>
        <input
          onChange={this.handleChange.bind(this)}
        />
      </div>
    )
  }
}

export default Searchbar