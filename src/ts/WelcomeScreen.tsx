import * as React from 'react';
import { TEvent, TUser } from './data/types';
import Notifications from './Notifications';

interface IWelcomeScreenProps {
  user: TUser,
  notifications: TEvent[],
  onAccept: () => void
}

const WelcomeScreen: React.FunctionComponent<IWelcomeScreenProps> = (props) => {
  return <>
    <div className='main-background'></div>
    <div className='welcome-screen-container'>
      <h1 className='welcome-screen-greet'>Здравствуйте,</h1>
      <h1 className='welcome-screen-email'>{props.user.email}</h1>
      <div className='welcome-screen-notifications'>
        <Notifications events={props.notifications} />
      </div>
      <button className='welcome-screen-main-button' onClick={props.onAccept}>Начать работу</button>
    </div>

  </>;
};

export default WelcomeScreen;
