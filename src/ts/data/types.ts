export const EVENT_TYPES = ['Контакт', 'Переговоры', 'Звонок', 'Задача', 'Заметка']

export type TAlert = {
    type: 'Success' | 'Error' | 'Notification',
    message: string
}

export type TUser = {
    id?: number,
    email: string,
    phone: string,
    birthday?: string,
    token?: string
}

export type TEvent = {
    id?: number,
    title: string,
    client?: string,
    event_type: 'Контакт' | 'Переговоры' | 'Звонок' | 'Задача' | 'Заметка',
    address?: string,
    comment?: string,

    date_from: string,
    date_to: string,


    contacts: TContact[],
    manager: TUser,
    status: number,

    y?: number
}

export type TContact = {
    id?: number,
    email: string,
    phone: string,
    address: string
}