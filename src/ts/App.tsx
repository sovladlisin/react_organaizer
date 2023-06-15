
import React, { useEffect, useState } from 'react';
import { TAlert, TContact, TEvent, TUser } from './data/types';
import Icon from './utils/Icon';
import Dashboard from './Dashboard';
import Calendar from './Calendar';
import Contacts from './Contacts';
import Cabinet from './Cabinet';
import Login from './Login';
import { getContacts, getEvents } from './data/actions';
import Notifications from './Notifications';
import WelcomeScreen from './WelcomeScreen';
import Alert from './Alert';
import { compareDates } from './utils';

const App: React.FC = () => {
  // data containers
  const [user, setUser] = useState<TUser>(null)
  const [contacts, setContacts] = useState<TContact[]>([])
  const [events, setEvents] = useState<TEvent[]>([])
  const [notifications, setNotifications] = useState<TEvent[]>([])
  const [alerts, setAlerts] = useState<TAlert[]>([])

  const onLoad = async () => {
    const events = await getEvents(user.token)
    setEvents(events)
    const contacts = await getContacts(user.token)
    setContacts(contacts)
    setNotifications(collectNotifications(events))
  }

  const collectNotifications = (ev: TEvent[]) => {
    const date = new Date()
    return ev.filter(e => e.status != 3).filter(e => {
      var d1 = new Date(e.date_from)
      var d2 = new Date(e.date_to)

      // d2.setUTCHours(0, 0, 0, 0);
      // d1.setUTCHours(23, 59, 59, 999);
      if (date.getTime() >= d1.getTime() && date.getTime() <= d2.getTime())
        return true
      else if (compareDates(d1, date) || compareDates(d2, date))
        return true
      return false

    })
  }

  useEffect(() => {
    if (user && user.token && user.token.length > 0)
      onLoad()
  }, [, user])


  const [mode, setMode] = useState(1)


  const logout = () => {
    setUser(null)
    setMode(1)
  }

  const createAlert = (a: TAlert) => {
    setAlerts([...alerts, a])
  }

  if (!user) return <>
    <Login onCreateAlert={createAlert} onLogin={(user: TUser) => {
      setUser(user)
      setMode(66)
    }} />
    <Alert alerts={alerts} onClear={() => setAlerts([])} />

  </>


  if (mode === 66) return <>
    <WelcomeScreen onAccept={() => setMode(1)} user={user} notifications={notifications} />
    <Alert alerts={alerts} onClear={() => setAlerts([])} />

  </>




  return (
    <>
      <div className='header'>
        <div className='header-logo-inner'>
          <button className='header-logo'>
            <Icon icon='logo' className='header-logo-icon' />
            <p className='header-logo-title'>Органайзер</p>
          </button>
          <div className='header-controls'>
            <button className={mode === 1 ? 'selected' : ''} onClick={_ => setMode(1)}>События</button>
            <button className={mode === 2 ? 'selected' : ''} onClick={_ => setMode(2)}>Календарь</button>
            <button className={mode === 3 ? 'selected' : ''} onClick={_ => setMode(3)}>Контакты</button>
          </div>
        </div>
      </div>

      <div className='right-panel'>
        <button title={'Личный кабинет'} className={mode === 4 ? 'selected' : ''} onClick={_ => setMode(4)}><Icon className='right-panel-icon' icon='user'></Icon></button>
        <button title={'Напоминания'} className={mode === 5 ? 'selected' : ''} onClick={_ => setMode(5)}><Icon className='right-panel-icon' icon='bell'></Icon><span className='color-white bg-red notification-counter'>{notifications.length}</span></button>
      </div>


      <div className='main-workspace'>
        {mode === 1 && <Dashboard onCreateAlert={createAlert} onUpdate={onLoad} onEventUpdate={(events: TEvent[]) => setEvents(events)} contacts={contacts} user={user} events={events} />}
        {mode === 2 && <Calendar events={events} />}
        {mode === 3 && <Contacts onCreateAlert={createAlert} contacts={contacts} user={user} onUpdateContacts={(contacts: TContact[]) => setContacts(contacts)} />}
        {mode === 4 && <Cabinet onCreateAlert={createAlert} onLogout={() => logout()} user={user} onUpdateUser={(user: TUser) => setUser(user)} />}
        {mode === 5 && <Notifications events={notifications} />}
      </div>


      <Alert alerts={alerts} onClear={() => setAlerts([])} />

    </>
  )
}
export default App
