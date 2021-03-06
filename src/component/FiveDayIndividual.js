import React, { Component } from 'react';
import { createDate } from '../helper';
import './FiveDayIndividual.css';

class FiveDayIndividual extends Component {
  update = () => (
    this.props.updateDisplay(this.props.idx)
  )
  
  render() {
    return(
      <div onClick={this.update} className="five-day-individual-container">
        <div className="five-day-individual-day">{createDate(this.props.dt).weekday}</div>
        <div className="five-day-individual-image" style={{backgroundImage: `url(${this.props.url})`}}></div>
        <div className="five-day-individaul-temp">
          <span>{Math.floor(this.props.max_temp)} &deg;| {Math.floor(this.props.min_temp)} &deg;</span>
        </div>
        
      </div>
    )
  }
}

export default FiveDayIndividual