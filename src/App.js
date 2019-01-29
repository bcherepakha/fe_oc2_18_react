import React, { Component } from 'react';

import './App.css';

import ClockWidget from './ClockWidget/ClockWidget';
import ChooseCity from './ChooseCity/ChooseCity';

class App extends Component {
  state = {
      clock: new Date(),
      currentPosition: null,
      cities: []
  }

  componentDidMount() {
      setInterval(this.updateClock, 1000);

      navigator.geolocation.getCurrentPosition(this.saveCurrentPosition);
  }

  saveCurrentPosition = position => {
      this.setState({
          currentPosition: {
              lat: position.coords.latitude,
              lon: position.coords.longitude
          }
      });
  }

  getClockDataForCities() {
      const {clock, cities} = this.state;

      return cities.map((name, idx) => {
          const cityClock = new Date(clock);

          cityClock.setMinutes(cityClock.getMinutes() - idx*30);

          return {
              name,
              clockData: this.getClockData(cityClock)
          };
      })
  }

  getClockData(clock) {
      return {
          date: `${clock.getFullYear()}-${(clock.getMonth() + 1).toString().padStart(2, '0')}-${clock.getDate().toString().padStart(2, '0')}`,
          time: clock.toTimeString().split(' ')[0]
      }
  }

  updateClock = () => {
      this.setState({
          clock: new Date()
      });
  }

  addClock = ({display_name, lat, lon, place_id}) => {
      const {cities} = this.state;

      this.setState({
          cities: [...cities, {display_name, lat, lon, place_id}]
      });
  }

  render() {
      const {currentPosition} = this.state;

      return (
          <div className='app'>
              <ChooseCity addCity={this.addClock}/>
              {currentPosition && <ClockWidget {...currentPosition}/>}
              <hr/>
          </div>
      );
  }
}

export default App;
