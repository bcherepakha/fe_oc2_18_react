import React from 'react';

import {locationiqToken} from '../config';
import Clock from '../Clock/Clock';

export default class ClockWidget extends React.Component {
    static defaultProps = {
        display_name: '',
        lat: null,
        lon: null
    }

    componentDidMount() {
        this.getTimezone();

        if (!this.props.display_name) {
            this.getPosition();
        }
    }

    state = {
        timezone: null,
        dateData: null
    }

    getPosition() {
        const {lat, lon} = this.props;

        fetch(`https://us1.locationiq.com/v1/reverse.php?key=${locationiqToken}&lat=${lat}&lon=${lon}&format=json`)
            .then(response => response.json())
            .then(({display_name, place_id}) => this.setState({display_name, place_id}))
            .catch(console.error);
    }

    getTimezone() {
        const {lat, lon} = this.props;

        fetch(`https://my.locationiq.com/v2/timezone.php?token=${locationiqToken}&lat=${lat}&lon=${lon}`)
            .then(response => response.json())
            .then(({timezone}) => this.setState({
                timezone,
                dateData: this.getClockData(new Date(), timezone)
            }))
            .catch(console.error);
    }

    getClockData(clock = new Date(), timezone = this.state.timezone) {
        const clockWithOffset = new Date(clock);

        clockWithOffset.setMinutes( clockWithOffset.getMinutes() + timezone.offset_sec/60 + clockWithOffset.getTimezoneOffset() );

        return {
            date: `${clockWithOffset.getFullYear()}-${(clockWithOffset.getMonth() + 1).toString().padStart(2, '0')}-${clockWithOffset.getDate().toString().padStart(2, '0')}`,
            time: clockWithOffset.toTimeString().split(' ')[0]
        }
    }

    render() {
        const display_name = this.props.display_name || this.state.display_name,
            {dateData, timezone} = this.state,
            timezoneName = timezone && timezone.name;

        return <React.Fragment>
            <h3>{display_name || timezoneName}</h3>
            {dateData && <Clock {...dateData}/>}
        </React.Fragment>;
    }
}
