import React, { Component } from 'react';
import './FiveDayForecast.css';

export default class FiveDayForecast extends Component {
  render() {
    return (
      <div className="five-day-container">
        {this.props.fiveday}
      </div>
    )
  }
}