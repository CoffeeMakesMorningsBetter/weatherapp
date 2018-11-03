import React, { Component } from 'react';
import { createDate } from '../helper';
import './Display.css';

class Display extends Component {
  render() {
    return (
      <div className="display-container">
        <div className="display-info">
          <div className="display-info-city">
            <h4>{this.props.searchterm}, {this.props.country}</h4>
            <h6>{createDate(this.props.date).weekday}</h6>
            <h6>{this.props.weatherCondition}</h6>
          </div>
          <div className="display-image">
            <div className="display-image-container" style={{backgroundImage: `url(${this.props.url})`}}></div>
            <div className="display-image-temp"><span>{Math.floor(this.props.temp)}</span></div>
            <div className="toggle" onClick={this.props.toggle}>
              <span>&deg;F</span> |<span>&deg;C</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Display