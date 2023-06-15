import * as React from 'react';
import { isDev, login, register } from './data/actions';
import { TAlert, TUser } from './data/types';

interface ILoginProps {
    onLogin: (user: TUser) => void,
    onCreateAlert: (alert: TAlert) => void
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {

    const [mode, setMode] = React.useState(1)

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [password2, setPassword2] = React.useState('')


    const onLogin = async (e) => {
        e.preventDefault()

        if (email.length === 0 || password.length === 0) {
            props.onCreateAlert({ type: 'Error', message: 'Неверный логин или пароль' })
            return;
        }

        const user = await login(email, password).catch(err => {
            props.onCreateAlert({ type: 'Error', message: 'Неверный логин или пароль' })

        })
        // const user = isDev ? await login('test@test.com', 'test') : await login(email, password)
        user && props.onLogin(user)
    }

    const onRegister = async (e) => {
        e.preventDefault()

        if (email.length === 0 || password.length === 0) {
            props.onCreateAlert({ type: 'Error', message: 'Введите логин и пароль' })
            return;
        }

        if (password != password2) {
            props.onCreateAlert({ type: 'Error', message: 'Пароли не совпадают' })
            return;
        }

        const user = await register(email, password).catch(err => {
            props.onCreateAlert({ type: 'Error', message: 'Пользователь с таким логином уже существует' })

        })

        user && props.onLogin(user)
    }




    return <>

        <div className='auth-background'></div>

        <div className='auth-window'>
            <div className='auth-modes'>
                <button className={mode === 1 ? 'selected' : ''} onClick={_ => setMode(1)}>Вход</button>
                <button className={mode === 2 ? 'selected' : ''} onClick={_ => setMode(2)}>Регистрация</button>
            </div>

            {mode === 1 && <>
                <form className='auth-form' onSubmit={onLogin}>
                    <div className='auth-fields'>

                        <label>Почта</label>
                        <input type='email' value={email} onChange={e => setEmail(e.target.value)}></input>

                        <label>Пароль</label>
                        <input type='password' value={password} onChange={e => setPassword(e.target.value)}></input>
                    </div>
                    <div className='auth-form-controls'>
                        <button className='bg-blue color-white'>Войти</button>
                    </div>
                </form>
            </>}

            {mode === 2 && <>
                <form className='auth-form' onSubmit={onRegister}>
                    <div className='auth-fields'>

                        <label>Почта</label>
                        <input type='email' value={email} onChange={e => setEmail(e.target.value)}></input>

                        <label>Пароль</label>
                        <input type='password' value={password} onChange={e => setPassword(e.target.value)}></input>

                        <label>Повторите пароль</label>
                        <input type='password' value={password2} onChange={e => setPassword2(e.target.value)}></input>
                    </div>
                    <div className='auth-form-controls'>
                        <button className='bg-blue color-white'>Зарегистрироваться</button>
                    </div>
                </form>
            </>}
        </div >

    </>;
};

export default Login;
