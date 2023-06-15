import * as React from 'react';
import Icon from './utils/Icon';
import { TAlert, TContact, TEvent, TUser } from './data/types';
import GridLayout from "react-grid-layout";
import EventForm from './forms/EventForm';
import { createEvent, deleteEvent, updateEvent } from './data/actions';

interface IDashboardProps {
    user: TUser,
    contacts: TContact[],
    events: TEvent[],

    onEventUpdate: (events: TEvent[]) => void,
    onCreateAlert: (alert: TAlert) => void,
    onUpdate?: () => void
}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
    const [_, forceUpdate] = React.useReducer((x) => x + 1, 0);

    const [currentEvents, setCurrentEvents] = React.useState<TEvent[]>(props.events ? props.events : [])
    React.useEffect(() => {
        setCurrentEvents(props.events)
    }, [, props.events])

    React.useEffect(() => {
        props.onEventUpdate(currentEvents)
    }, [, currentEvents])

    const [search, setSearch] = React.useState('')




    const collectEventLayout = (event: TEvent) => {
        const number_of_contacts = event.contacts.length
        const new_h = 1 + number_of_contacts / 2
        return { i: event.id, h: new_h, w: 1, x: event.status - 1, y: event.y ? event.y : 0 }

    }
    const [currentLayout, setCurrentLayout] = React.useState([])
    const collectLayout = () => setCurrentLayout(currentEvents.map(event => collectEventLayout(event)))
    React.useEffect(() => { collectLayout() }, [, currentEvents])


    const [width, setWidth] = React.useState(1200)

    React.useLayoutEffect(() => {
        let box = document.getElementById('dashboard');
        let cur_width = box.offsetWidth;
        if (width != cur_width)
            setWidth(cur_width)
    })

    React.useEffect(() => {
        const handleWindowResize = () => {
            let box = document.getElementById('dashboard');
            let cur_width = box.offsetWidth;
            console.log(cur_width)
            if (width != cur_width)
                setWidth(cur_width)
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    const [addEventWindow, setAddEventWindow] = React.useState(false)
    const [eventSettings, seteventSettings] = React.useState<TEvent>(null)

    const onAddEvent = async (event: TEvent) => {
        const new_event = await createEvent(props.user.token, event)
        setCurrentEvents([...currentEvents, new_event])
        props.onCreateAlert({ type: 'Success', message: 'Задача создана' })

    }

    const onUpdateEvent = async (event: TEvent) => {
        const new_event = await updateEvent(props.user.token, event)

        const events_clone: TEvent[] = JSON.parse(JSON.stringify(currentEvents))

        setCurrentEvents(events_clone.map(e => e.id === event.id ? event : e))
        props.onCreateAlert({ type: 'Success', message: 'Задача обновлена' })
    }


    const onDeleteEvent = async (id: number) => {
        const res = await deleteEvent(props.user.token, id)

        const events_clone: TEvent[] = JSON.parse(JSON.stringify(currentEvents))

        setCurrentEvents(events_clone.filter(e => e.id != id))
        props.onCreateAlert({ type: 'Success', message: 'Задача удалена' })

    }



    const onLayoutChange = (l) => {

        l.map(item => {
            const x = parseInt(item.x + 1)
            const id = parseInt(item.i)

            const found = currentEvents.find(e => e.id === id)
            if (found && found.status != x) {
                onUpdateEvent({ ...found, status: x, y: item.y })
            }
        })
    }

    // React.useLayoutEffect(() => {


    //     var slides = document.getElementsByClassName("slide");
    //     for (var i = 0; i < slides.length; i++) {
    //         const item = slides.item(i)
    //         console.log(item)
    //     }

    //     // document.getElementsByClassName('event-card')
    //     // if (ref.current) {
    //     //      const height = ref.current.clientHeight
    //     //      const scroll = ref.current.scrollHeight
    //     //       if (scroll > height) {
    //     //         const newRowHeight = Math.ceil(scroll / GRID_ROW_SIZE)
    //     //         // –> update this grid item { h: newRowHeight }
    //     //       }
    //     // }
    // })



    return <>
        <div className='dashboard-search'>
            <Icon className='search-icon' icon='search' />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder='Поиск по задачам'></input>
            <button onClick={props.onUpdate} className='dashboard-search-update-button bg-red color-white'><Icon className='' icon='update'></Icon></button>
            <button onClick={_ => setAddEventWindow(true)} className='dashboard-search-add-button'>
                <Icon icon='plus' className='dashboard-search-add-icon' />
                <p>Добавить задачу</p>
            </button>
        </div>

        <div className='dashboard-container' id="dashboard">
            <GridLayout
                className="layout"
                onLayoutChange={l => { onLayoutChange(l); }}
                cols={3}
                layout={currentLayout}

                rowHeight={55}
                width={width}
            >
                <div className='event-card-header bg-blue' key={'h'} data-grid={{ x: 0, y: 0, w: 1, h: 1, static: true }}>
                    <p>Новые</p>
                </div>
                <div className='event-card-header bg-red' key={'e'} data-grid={{ x: 1, y: 0, w: 1, h: 1, static: true }}>
                    <p>Выполняются</p>
                </div>
                <div className='event-card-header bg-green' key={'v'} data-grid={{ x: 2, y: 0, w: 1, h: 1, static: true }}>
                    <p>Завершены</p>
                </div>
                {currentEvents.filter(c => JSON.stringify(c).toLocaleLowerCase().includes(search.toLocaleLowerCase())).map(event => {
                    return <div className='event-card' key={event.id} data-grid={collectEventLayout(event)}>
                        <p className='event-card-title' title={event.title}>{event.title}</p>
                        <p className='event-card-dates'>{new Date(event.date_from).toLocaleDateString('ru')} - {new Date(event.date_to).toLocaleDateString('ru')}</p>
                        <div className='event-card-contacts'>
                            {event.contacts.map(contact => {
                                return <div className='event-card-contact'>
                                    <Icon icon='user' className='event-card-contact-user' />
                                    <p title={contact.email}>{contact.email}</p>
                                </div>
                            })}

                        </div>
                        <button className='event-card-settings' onClick={_ => seteventSettings(event)}><Icon icon='cog' className='event-card-settings-cog' /></button>
                        <button className='event-card-delete-icon' onClick={_ => onDeleteEvent(event.id)}><Icon icon='delete' className='event-card-delete-icon' /></button>

                    </div>
                })}
            </GridLayout>
        </div>

        {addEventWindow && <EventForm
            user={props.user}
            all_contacts={props.contacts}
            onClose={() => setAddEventWindow(false)}
            onSave={(event: TEvent) => { onAddEvent(event) }}
            onUpdate={(event: TEvent) => { onUpdateEvent(event) }}
        />}

        {eventSettings && <EventForm
            user={props.user}
            all_contacts={props.contacts}
            onClose={() => seteventSettings(null)}
            onSave={(event: TEvent) => { onAddEvent(event) }}
            onUpdate={(event: TEvent) => { onUpdateEvent(event) }}
            event={eventSettings}
        />}
    </>;
};

export default Dashboard;
