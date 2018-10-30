import React, { Component } from 'react';

export default class FiveDayForecast extends Component {
  render() {
    return (
      <div>
        {this.props.fiveday}
      </div>
    )
  }
}