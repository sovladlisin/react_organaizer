import * as React from 'react';
import { TEvent } from './data/types';
import { DefaultDeserializer } from 'v8';
import { getStatusColor, getStatusName } from './utils';

interface IEventInfoProps {
    event: TEvent,
    onClose: () => void
}

const EventInfo: React.FunctionComponent<IEventInfoProps> = (props) => {

    const ref = React.useRef()



    return <>
        <div className='main-background' onClick={_ => props.onClose()}></div>
        <div className='form-container' ref={ref}>
            <h1 className='form-header'>Задача <span className='event-info-status' style={{ 'background': getStatusColor(props.event.status), 'color': 'white' }}>{getStatusName(props.event.status)}</span></h1>

            <div className='form-container-form'>
                <div className='form-fields'>
                    <label>Название</label><p>{props.event.title}</p>
                    <label>Клиент</label><p>{props.event.client}</p>
                    <label>Тип</label><p>{props.event.event_type}</p>
                    <label>Адрес</label><p>{props.event.address}</p>
                    <label>Описание</label><p>{props.event.comment}</p>
                    <label>Начало</label><p>{props.event.date_from}</p>
                    <label>Конец</label><p>{props.event.date_to}</p>
                </div>

                {props.event.contacts.length > 0 && <>

                    <h2 className='form-mini-header'>Исполнители</h2>
                    <div className='event-contact-list'>
                        {props.event.contacts.map(c => {
                            return <>
                                <div className='event-contact-list-item'>
                                    <p>{c.email}</p>
                                    <p>{c.phone}</p>
                                </div>
                            </>
                        })}
                    </div>
                </>}
            </div>
            <div />


        </div>





    </>;
};

export default EventInfo;
