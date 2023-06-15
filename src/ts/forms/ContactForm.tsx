import * as React from 'react';
import { TContact } from '../data/types';
import { useOnClickOutside } from '../utils/HandleClickOutside';

interface IContactFormProps {
    contact?: TContact,
    onClose: () => void,
    onSave?: (contact: TContact) => void,
    onUpdate?: (contact: TContact) => void,
}

const ContactForm: React.FunctionComponent<IContactFormProps> = (props) => {

    const defaultContact: TContact = {
        email: '',
        phone: '',
        address: ''
    }

    const [contact, setContact] = React.useState<TContact>(props.contact ? props.contact : defaultContact)

    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())

    const onSave = (e) => {
        e.preventDefault()
        if (!contact.id)
            props.onSave(contact)
        else
            props.onUpdate(contact)
        props.onClose()
    }

    return <>
        <div className='form-container' ref={ref}>
            <h1 className='form-header'>Форма контакта</h1>

            <form onSubmit={onSave}>
                <div className='form-fields'>
                    <label>Почта</label>
                    <input type='email' value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} placeholder='example@example.com'></input>

                    <label>Телефон</label>
                    <input value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} placeholder='+7-999-999-99-99'></input>

                    <label>Адрес</label>
                    <input value={contact.address} onChange={e => setContact({ ...contact, address: e.target.value })} placeholder='Москва, ул. ...'></input>
                </div>

                <div className='form-controls'>
                    <button className='bg-blue color-white'>Применить</button>
                </div>
            </form>
        </div>
    </>;
};

export default ContactForm;
