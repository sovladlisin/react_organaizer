import * as React from 'react';
import { EVENT_TYPES, TContact, TEvent, TUser } from '../data/types';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import SelectDates from './SelectDates';
import Icon from '../utils/Icon';

interface IEventFormProps {
    user: TUser,
    event?: TEvent,
    all_contacts: TContact[]
    onSave?: (user: TEvent) => void,
    onUpdate?: (user: TEvent) => void,
    onClose: () => void,
}

const EventForm: React.FunctionComponent<IEventFormProps> = (props) => {

    const defaultEvent: TEvent = {
        title: '',
        client: '',
        event_type: 'Задача',
        address: '',
        comment: '',
        date_from: new Date().toLocaleDateString(),
        date_to: new Date().toLocaleDateString(),

        contacts: [],
        manager: props.user,
        status: 1
    }

    const [event, setEvent] = React.useState<TEvent>(props.event ? props.event : defaultEvent)

    const ref = React.useRef()
    // useOnClickOutside(ref, () => props.onClose())

    const onSave = () => {
        console.log(event)
        if (!event.id)
            props.onSave(event)
        else
            props.onUpdate(event)
        props.onClose()
    }

    const [isDates, setIsDates] = React.useState(false)

    React.useEffect(() => {
        console.log(event)
    }, [])

    const toggleContact = (c: TContact) => {
        event.contacts.find(co => co.id === c.id) ?
            setEvent({ ...event, contacts: event.contacts.filter(e_c => e_c.id != c.id) }) :
            setEvent({ ...event, contacts: [...event.contacts, c] })
    }

    const [searchContact1, setSearchContact1] = React.useState('')
    const [searchContact2, setSearchContact2] = React.useState('')

    return <>
        <div className='main-background' onClick={_ => props.onClose()}></div>

        {isDates && <>
            <SelectDates
                onSubmit={(from: Date, to: Date, period: string) => {
                    setEvent({ ...event, date_from: from.toDateString(), date_to: to.toDateString() })
                }}
                title={'Выбрать период задачи'}
                from={event.date_from ? new Date(event.date_from) : new Date()}
                to={event.date_to ? new Date(event.date_to) : new Date()}
                onClose={() => setIsDates(false)}
            />
        </>}

        <div className='form-container' ref={ref}>
            <h1 className='form-header'>Форма события</h1>

            <div className='form-container-form'>
                <div className='form-fields'>
                    <label>Название</label>
                    <input value={event.title} onChange={e => setEvent({ ...event, title: e.target.value })} placeholder='Название события'></input>

                    <label>Клиент</label>
                    <input value={event.client} onChange={e => setEvent({ ...event, client: e.target.value })} placeholder='Имя клиента'></input>

                    <label>Тип события</label>
                    {/* @ts-ignore */}
                    <select value={event.event_type} onChange={e => setEvent({ ...event, event_type: e.target.value })}>
                        {EVENT_TYPES.map(t => {
                            return <option value={t}>{t}</option>
                        })}
                    </select>

                    <label>Адрес</label>
                    <input value={event.address} onChange={e => setEvent({ ...event, address: e.target.value })} placeholder='Адрес'></input>

                    <label>Комментарий</label>
                    <input value={event.comment} onChange={e => setEvent({ ...event, comment: e.target.value })} placeholder='Комментарий'></input>

                    {/* date_from */}
                    {/* date_to */}
                    <label>Период задачи</label>
                    <button className='form-event-timespan-button' onClick={_ => setIsDates(true)}>
                        <p>{new Date(event.date_from).toLocaleDateString()}</p>
                        <Icon icon='arrowRightLong' className='form-event-timespan-button-arrow' />
                        <p>{new Date(event.date_to).toLocaleDateString()}</p>
                    </button>

                    <label>Исполнители</label>
                    <div className='form-multiple-select'>
                        <h3 className='form-multiple-select-header'>Выбор исполнителей</h3>
                        <div className='form-multiple-select-search-container'>
                            <Icon icon='search' className='form-multiple-select-search-container-icon'></Icon>
                            <input value={searchContact1} onChange={e => setSearchContact1(e.target.value)} placeholder='Поиск по контактам' />
                        </div>
                        <div className='form-multiple-select-select'>
                            {props.all_contacts.filter(c => JSON.stringify(c).toLocaleLowerCase().includes(searchContact1.toLocaleLowerCase())).map(c => {
                                const includes = event.contacts.find(e_c => e_c.id === c.id)
                                return <div className='contact-info-inline'>
                                    <p>{c.email}</p>
                                    <p>{c.phone}</p>

                                    <button onClick={_ => {
                                        toggleContact(c)
                                    }} className={includes ? 'color-white bg-red' : 'color-white bg-blue'} >
                                        {includes ? 'Убрать' : 'Добавить'}
                                    </button>
                                </div>
                            })}
                        </div>

                        <h3 className='form-multiple-select-header'>Выбранные исполнители</h3>
                        <div className='form-multiple-select-search-container'>
                            <Icon icon='search' className='form-multiple-select-search-container-icon'></Icon>
                            <input value={searchContact2} onChange={e => setSearchContact2(e.target.value)} placeholder='Поиск по контактам' />
                        </div>

                        <div className='form-multiple-select-select'>
                            {event.contacts.filter(c => JSON.stringify(c).toLocaleLowerCase().includes(searchContact2.toLocaleLowerCase())).map(c => {
                                return <div className='contact-info-inline'>
                                    <p>{c.email}</p>
                                    <p>{c.phone}</p>

                                    <button onClick={_ => {
                                        toggleContact(c)
                                    }} className={'color-white bg-red'} >
                                        {'Убрать'}
                                    </button>
                                </div>
                            })}
                        </div>


                    </div>

                </div>

                <div className='form-controls'>
                    <button className='bg-blue color-white' onClick={onSave}>Применить</button>
                    <button className='bg-blue color-white' onClick={props.onClose}>Отмена</button>
                </div>
            </div>
        </div>
    </>;
};

export default EventForm;
