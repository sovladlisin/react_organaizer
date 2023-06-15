import * as React from 'react';
import { TAlert } from './data/types';
import Icon from './utils/Icon';
import { useOnClickOutside } from './utils/HandleClickOutside';

interface IAlertProps {
    alerts: TAlert[],
    onClear: () => void
}

const Alert: React.FunctionComponent<IAlertProps> = (props) => {

    const getIcon = (a: TAlert) => {
        switch (a.type) {
            case 'Success':
                return <Icon icon='check' className='color-green' />
            case 'Error':
                return <Icon icon='error' className='color-red' />
            case 'Notification':
                return <Icon icon='bell' className='color-blue' />
            default:
                break;
        }
    }

    const ref = React.useRef()
    useOnClickOutside(ref, props.onClear)

    return <>
        <div className='alerts-container' ref={ref}>
            {props.alerts.map(a => {
                return <div className='alert'>
                    {getIcon(a)}
                    <p>{a.message}</p>
                </div>
            })}
        </div>
    </>;
};

export default Alert;
