import React from 'react';

import './Clock.css';

const MONTH = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь'
]

export default function Clock(props) {
    const {date, time} = props,
        [fullYear, month, dateNum] = date.split('-'),
        [hh, mm, ss] = time.split(':');

    return <div className='clock'>
        <div className='clock__date'>
            {`${dateNum} ${MONTH[month - 1]} ${fullYear}`}
        </div>
        <div className='clock__time'>
            <div className='clock__time-hh'>
                {hh}
            </div>
            {':'}
            <div className='clock__time-mm'>
                {mm}
            </div>
            {ss && ':'}
            {ss &&
                <div className='clock__time-ss'>
                    {ss}
                </div>}
        </div>
    </div>;
}
