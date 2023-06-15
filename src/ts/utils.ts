export const myCustomLocale = {
    // months list by order
    months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ],

    // week days by order
    weekDays: [
        {
            name: 'Воскресенье', // used for accessibility 
            short: 'Вс', // displayed at the top of days' rows
            isWeekend: true, // is it a formal weekend or not?
        },
        {
            name: 'Понедельник',
            short: 'Пн',
        },
        {
            name: 'Вторник',
            short: 'Вт',
        },
        {
            name: 'Среда',
            short: 'Ср',
        },
        {
            name: 'Четверг',
            short: 'Чт',
        },
        {
            name: 'Пятница',
            short: 'Пт',
        },
        {
            name: 'Суббота',
            short: 'Сб',
            isWeekend: true,
        },
    ],

    // just play around with this number between 0 and 6
    weekStartingIndex: 0,

    // return a { year: number, month: number, day: number } object
    getToday(gregorainTodayObject) {
        return gregorainTodayObject;
    },

    // return a native JavaScript date here
    toNativeDate(date) {
        return new Date(date.year, date.month - 1, date.day);
    },

    // return a number for date's month length
    getMonthLength(date) {
        return new Date(date.year, date.month, 0).getDate();
    },

    // return a transformed digit to your locale
    transformDigit(digit) {
        return digit;
    },

    // texts in the date picker
    nextMonth: 'Next Month',
    previousMonth: 'Previous Month',
    openMonthSelector: 'Open Month Selector',
    openYearSelector: 'Open Year Selector',
    closeMonthSelector: 'Close Month Selector',
    closeYearSelector: 'Close Year Selector',
    defaultPlaceholder: 'Select...',

    // for input range value
    from: 'от',
    to: 'до',


    // used for input value when multi dates are selected
    digitSeparator: ',',

    // if your provide -2 for example, year will be 2 digited
    yearLetterSkip: 0,

    // is your language rtl or ltr?
    isRtl: false,
}

export const getStatusColor = (s: number) => {
    switch (s) {
        case 1:
            return '#386bee'

        case 2:
            return '#ff3d3d'

        case 3:
            return '#18bf80'
            break;

        default:
            break;
    }
}

export const getStatusName = (s: number) => {
    switch (s) {
        case 1:
            return 'Новый'
        case 2:
            return 'Выполняется'
        case 3:
            return 'Завершен'
        default:
            break;
    }
}

export const compareDates = (d1: Date, d2: Date) => {
    if (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate())
        return true
    return false

}