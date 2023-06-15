import * as React from 'react';
import { TAlert, TUser } from './data/types';
import Icon from './utils/Icon';
import UserForm from './forms/UserForm';
import { updateUser } from './data/actions';

interface ICabinetProps {
    user: TUser,
    onLogout: () => void,
    onUpdateUser: (user: TUser) => void,
    onCreateAlert: (alert: TAlert) => void
}

const Cabinet: React.FunctionComponent<ICabinetProps> = (props) => {

    const [userWidnow, setUserWindow] = React.useState(false)

    const updateUserLocal = async (user: TUser) => {
        const new_user = await updateUser(props.user.token, user.phone)
        props.onUpdateUser(new_user)
        props.onCreateAlert({ type: 'Success', message: 'Телефон обновлен' })

    }

    return <>
        <h1 className='cabinet-title'>Личный кабинет</h1>


        <div className='cabinet-user-info'>
            <Icon className='cabinet-user-info-icon' icon='user'></Icon>
            <div className='cabinet-user-info-params'>
                <label>#ID</label><p>{props.user.id}</p>
                <label>Почта</label><p>{props.user.email}</p>
                <label>Телефон</label><p>{props.user.phone}</p>
            </div>
        </div>

        <div className='cabinet-controls'>
            <button className='bg-blue color-white' onClick={_ => setUserWindow(true)}>Редактировать</button>
            <button onClick={props.onLogout} className='bg-red color-white'>Выход</button>
        </div>

        {userWidnow && <UserForm user={props.user} onUpdate={(user: TUser) => updateUserLocal(user)} onClose={() => setUserWindow(false)} />}

    </>;
};

export default Cabinet;
