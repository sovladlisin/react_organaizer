import * as React from 'react';
import { TAlert, TContact, TUser } from './data/types';
import Icon from './utils/Icon';
import { createContact, deleteContact, updateContact } from './data/actions';
import ContactForm from './forms/ContactForm';

interface IContactsProps {
    user: TUser,
    contacts: TContact[],
    onUpdateContacts: (contacts: TContact[]) => void,
    onCreateAlert: (alert: TAlert) => void

}

const Contacts: React.FunctionComponent<IContactsProps> = (props) => {

    const [contacts, setContacts] = React.useState<TContact[]>(props.contacts)
    React.useEffect(() => {
        setContacts(contacts)
    }, [, props.contacts])
    React.useEffect(() => {
        props.onUpdateContacts(contacts)
    }, [, contacts])

    const [search, setSearch] = React.useState('')
    const [addContactWindow, setAddContactwindow] = React.useState(false)
    const [updateContactWindow, setUpdateContactwindow] = React.useState<TContact>(null)


    const delete_contact = async (c: TContact) => {
        const id = await deleteContact(props.user.token, c.id)
        setContacts(contacts.filter(c => c.id != id))
        props.onCreateAlert({ type: 'Success', message: 'Контакт удален' })
    }

    const save_contact = async (c: TContact) => {
        const new_contact = await createContact(props.user.token, c)
        setContacts([...contacts, new_contact])
        props.onCreateAlert({ type: 'Success', message: 'Контакт добавлен' })
    }

    const update_contact = async (c: TContact) => {
        const new_contact = await updateContact(props.user.token, c)
        setContacts(contacts.map(co => co.id === new_contact.id ? new_contact : co))
        props.onCreateAlert({ type: 'Success', message: 'Контакт обновлен' })
    }

    return <>
        <div className='contacts-header-container'>
            <div className='contacts-search-container'>
                <Icon className='contacts-search-container-icon' icon='search'></Icon>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder='Поиск по контактам'></input>
            </div>
            <button onClick={_ => setAddContactwindow(true)} className='contacts-search-add-button'>
                <Icon icon='plus' className='contacts-search-add-icon' />
                <p>Добавить контакт</p>
            </button>
        </div>

        <div className='contacts-main-list'>
            {contacts.filter(c => JSON.stringify(c).toLocaleLowerCase().includes(search.toLocaleLowerCase())).map(c => {
                return <>
                    <div className='contacts-main-list-item'>
                        <div className='contacts-main-list-item-fields'>
                            <label>Почта</label><p>{c.email}</p>
                            <label>Телефон</label><p>{c.phone}</p>
                            <label>Адрес</label><p>{c.address}</p>
                        </div>
                        <div className='contacts-main-list-item-controls'>
                            <button className='bg-blue color-white' onClick={_ => setUpdateContactwindow(c)}>Редактировать</button>
                            <button className='bg-red color-white' onClick={_ => delete_contact(c)}>Удалить</button>
                        </div>
                    </div>
                </>
            })}
        </div>

        {addContactWindow && <ContactForm onSave={(c: TContact) => save_contact(c)} onClose={() => setAddContactwindow(false)} />}
        {updateContactWindow && <ContactForm contact={updateContactWindow} onUpdate={(c: TContact) => update_contact(c)} onClose={() => setUpdateContactwindow(null)} />}

    </>;
};

export default Contacts;
