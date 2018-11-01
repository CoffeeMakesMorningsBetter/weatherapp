import React, { Component } from 'react';
import { createDate } from '../helper';
import './FiveDayIndividual.css';

class FiveDayIndividual extends Component {
  update = () => (
    this.props.updateDisplay(this.props.idx)
  )
  
  render() {
    return(
      <div onClick={this.update} className="five-day-individual-container" style={{backgroundImage: `url(${this.props.url})`}}>
        <div className="five-day-individual-day">{createDate(this.props.dt).weekday}</div>
        <div className="five-day-individaul-temp">
          <span>{this.props.max_temp} &deg;| {this.props.min_temp} &deg;</span>
        </div>
        
      </div>
    )
  }
}

export default FiveDayIndividual