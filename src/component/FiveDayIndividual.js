import React, { Component } from 'react';
import { createDate } from '../helper';

class FiveDayIndividual extends Component {
  update = () => (
    this.props.updateDisplay(this.props.idx)
  )
  
  render() {
    return(
      <div onClick={this.update}>
        <div>{createDate(this.props.dt)}</div>
        <div>{this.props.main}</div>
        <div>Max Temp: {this.props.max_temp}</div>
        <div>Min Temp: {this.props.min_temp}</div>
      </div>
    )
  }
}

export default FiveDayIndividual