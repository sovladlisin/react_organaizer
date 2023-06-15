import * as React from 'react';
import { TEvent } from './data/types';
import EventInfo from './EventInfo';
import { compareDates, getStatusColor } from './utils';

interface ICalendarProps {
    events: TEvent[]
}

const Calendar: React.FunctionComponent<ICalendarProps> = (props) => {


    type TCalendarDay = {
        date: Date,
        events: TEvent[],
        is_today?: boolean
    }

    const [calendar, setCalendar] = React.useState<TCalendarDay[]>([])
    const [selectedEvent, setSelectedEvent] = React.useState<TEvent>(null)


    const getEventsForDay = (date: Date) => {
        return props.events.filter(e => e.status != 3).filter(e => {
            var d1 = new Date(e.date_from)
            var d2 = new Date(e.date_to)

            // d2.setUTCHours(0, 0, 0, 0);
            // d1.setUTCHours(23, 59, 59, 999);
            if (date.getTime() >= d1.getTime() && date.getTime() <= d2.getTime())
                return true
            else if (compareDates(d1, date) || compareDates(d2, date))
                return true
            return false

        })
    }

    const getWeekday = (c: TCalendarDay) => {
        switch (c.date.getDay()) {
            case 0:
                return 'Воскресенье'
            case 1:
                return 'Понедельник'
            case 2:
                return 'Вторник'
            case 3:
                return 'Среда'
            case 4:
                return 'Четверг'
            case 5:
                return 'Пятница'
            case 6:
                return 'Суббота'

        }
    }

    const generateMonth = () => {
        const first_day = new Date()
        const today = new Date()
        const today_day_number = today.getDay()

        // 0 - 6 воскр -- суббота
        var temp_calendar: TCalendarDay[] = []

        // for (let index = 0; index < today_day_number; index++) {
        //     // генерируем дни до
        //     var tomorrow = new Date();
        //     tomorrow.setDate(tomorrow.getDate() - (index + 1));
        //     temp_calendar.push({
        //         date: tomorrow,
        //         events: getEventsForDay(tomorrow),
        //         is_today: false
        //     })

        // }

        temp_calendar.push({
            date: today,
            events: getEventsForDay(today),
            is_today: true
        })


        for (let index = 0; index <= 28; index++) {

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + index + 1);
            temp_calendar.push({
                date: tomorrow,
                events: getEventsForDay(tomorrow),
                is_today: false
            })

        }

        setCalendar(temp_calendar)
    }

    React.useEffect(() => {
        generateMonth()
    }, [, props.events])

    return <>
        <div className='calendar-container'>
            {calendar.slice(0, 7).map(d => {
                return <div className='calendar-header'><p>{getWeekday(d)}</p></div>
            })}
            {calendar.map(d => {

                return <>
                    <div className={d.is_today ? 'calendar-cell today' : 'calendar-cell'}>
                        <p className='calendar-cell-date'>{d.date.getDate()}</p>
                        <div className='calendar-cell-events'>
                            {d.events.map(e => {
                                return <>
                                    <p style={{ 'background': getStatusColor(e.status) }} onClick={_ => setSelectedEvent(e)} className='calendar-cell-events-event-title'>{e.title}</p>
                                </>
                            })}
                        </div>

                    </div>
                </>
            })}
        </div>

        {selectedEvent && <EventInfo event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </>;
};

export default Calendar;
