import React, { Component } from 'react';

class Display extends Component {
  render() {
    return(
      <div>
        <h1>{this.props.searchterm}</h1>
        <h2>{this.props.date}</h2>
        <p>Weather Condition: {this.props.weatherCondition}</p>
        <p>temp: {this.props.temp}</p>
        <p>max temp: {this.props.maxTemp}</p>
        <p>min temp:{this.props.minTemp}</p>
      </div>
    )
  }
}

export default Display