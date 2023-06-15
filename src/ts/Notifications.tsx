import * as React from 'react';
import { TEvent } from './data/types';
import Icon from './utils/Icon';

interface INotificationsProps {
    events: TEvent[]
}

const Notifications: React.FunctionComponent<INotificationsProps> = (props) => {
    return <>
        <div className='notification-container'>
            {props.events.map(event => {
                return <>
                    <div className='notification-event-container'>
                        <p className='notification-event-title'>{event.title}</p>
                        <p className='notification-event-mini-header'>Исполнители</p>
                        {event.contacts.length > 0 && <>
                            <div className='notification-event-contacts'>
                                {event.contacts.map(c => {
                                    return <div className='notification-event-contact-container'>
                                        <Icon icon='user' className='notification-event-container-icon' />
                                        <p>{c.email}</p>
                                    </div>
                                })}
                            </div>
                        </>}
                    </div>

                </>
            })}
        </div>
    </>;
};

export default Notifications;
