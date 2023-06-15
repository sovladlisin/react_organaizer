
import * as React from 'react';
import { Calendar } from 'react-modern-calendar-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { myCustomLocale } from '../utils';
import { useOnClickOutside } from '../utils/HandleClickOutside';

interface ISelectDatesProps {
    onSubmit: (from: Date, to: Date, period: string) => void,
    title: string,


    from?: Date,
    to?: Date,
    onClose?: () => void
}
const SelectDates: React.FunctionComponent<ISelectDatesProps> = (props) => {

    const dateToDatePicker = (date) => {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        return { year, month, day }
    }





    const extractData = (time) => {
        const t = time.split(' ')[0].split('-')
        return { year: parseInt(t[0]), month: parseInt(t[1]), day: parseInt(t[2]) }
    }

    const confirm = () => {

    }

    const convertDate = (time) => {
        return new Date(time.year, time.month - 1, time.day)
    }

    const [start, setStart] = React.useState<any>(props.from ? dateToDatePicker(new Date(props.from)) : dateToDatePicker(new Date()))
    const [end, setEnd] = React.useState<any>(props.to ? dateToDatePicker(new Date(props.to)) : dateToDatePicker(new Date()))

    const maximumDate = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate()
    }

    const localization = myCustomLocale


    const onSubmit = () => {
        const from = convertDate(start)
        const to = convertDate(end)
        props.onSubmit(from, to, combinePeriod)
        props.onClose()
    }

    const [combinePeriod, setCombinePeriod] = React.useState<string>('day')
    const datediff = () => {
        const second = convertDate(end)
        const first = convertDate(start)
        // @ts-ignore
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }

    const setTimeSpan = (days: number) => {
        setEnd(dateToDatePicker(new Date()))
        var from = new Date();
        from.setDate(from.getDate() - days);
        setStart(dateToDatePicker(from))
    }


    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())

    return <>
        <div className='dates-background'></div>
        <div ref={ref} className='dates-container'>

            <p>Начало промежутка</p>
            <p>Конец промежутка</p>
            <div>
                <Calendar
                    value={start}
                    calendarClassName='reports-calendar'
                    colorPrimary='#4d75a3'
                    calendarTodayClassName="reports-calendar-today"
                    selectorEndingYear={new Date().getFullYear()}
                    selectorStartingYear={new Date().getFullYear() - 10}
                    onChange={setStart}
                    maximumDate={end}
                    minimumDate={dateToDatePicker(new Date())}
                    shouldHighlightWeekends
                    locale={localization}

                />
            </div>
            <div>
                <Calendar
                    value={end}
                    calendarClassName='reports-calendar'
                    colorPrimary='#4d75a3'
                    calendarTodayClassName="reports-calendar-today"
                    selectorEndingYear={new Date().getFullYear()}
                    selectorStartingYear={new Date().getFullYear() - 10}
                    onChange={setEnd}
                    minimumDate={dateToDatePicker(new Date())}
                    shouldHighlightWeekends
                    locale={localization}

                />
            </div>

            <button onClick={onSubmit} className={'dates-submit'}>{props.title}</button>
            <button onClick={props.onClose} className={'dates-cancel bg-red color-white'}>Отмена</button>

        </div>


        {/* <div className={'report-dates-params' + mobileClass}>
            <label>Группировка:</label>
            <select onChange={e => setCombinePeriod(e.target.value)} value={combinePeriod}>
                <option value={'day'}>Дни</option>
                {datediff() > 8 && <option value={'week'}>Недели</option>}
                {datediff() > 31 && <option value={'month'}>Месяцы</option>}
            </select>
        </div> */}
    </>
}

export default SelectDates