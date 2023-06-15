import * as React from 'react';
import { TContact, TUser } from '../data/types';
import { useOnClickOutside } from '../utils/HandleClickOutside';

interface IUserFormProps {
    user: TUser,
    onClose: () => void,
    onUpdate?: (user: TUser) => void,
}

const UserForm: React.FunctionComponent<IUserFormProps> = (props) => {

    const [user, setUser] = React.useState<TUser>(props.user)

    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())

    const onSave = (e) => {
        e.preventDefault()
        props.onUpdate(user)
        props.onClose()
    }

    return <>
        <div className='form-container' ref={ref}>
            <h1 className='form-header'>Форма пользователя</h1>

            <form onSubmit={onSave}>
                <div className='form-fields'>

                    <label>Телефон</label>
                    <input value={user.phone} onChange={e => setUser({ ...user, phone: e.target.value })} placeholder='+7-999-999-99-99'></input>
                </div>

                <div className='form-controls'>
                    <button className='bg-blue color-white'>Применить</button>
                </div>
            </form>
        </div>
    </>;
};

export default UserForm;
