import React, { Component } from 'react';

import './App.css';

import Clock from './Clock/Clock';
import ChooseCity from './ChooseCity/ChooseCity';

class App extends Component {
  state = {
      clock: new Date(),
      cities: []
  }

  componentDidMount() {
      setInterval(this.updateClock, 1000);
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

  addClock = tempCity => {
      const {cities} = this.state;

      this.setState({
          cities: [...cities, tempCity]
      });
  }

  render() {
      const {clock} = this.state,
        {date, time} = this.getClockData(clock),
        citiesClocks = this.getClockDataForCities();

      return (
          <div className='app'>
              <ChooseCity addCity={this.addClock}/>
              <h3>Текущее время</h3>
              <Clock date={date} time={time}/>
              <hr/>
              {citiesClocks.map(({name, clockData}) => (
                  <React.Fragment key={name}>
                      <h3>{name}</h3>
                      <Clock date={clockData.date} time={clockData.time}/>
                  </React.Fragment>
              ))}
          </div>
      );
  }
}

export default App;
