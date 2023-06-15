import axios from "axios";
import { TContact, TEvent, TUser } from "./types";

export const isDev = false
export const SERVER_URL = isDev ? 'http://localhost:8000/api/organaizer' : 'https://api.vtargete.pro/api/organaizer'


export const register = async (email: string, password: string) => {
    const body = JSON.stringify({ email, password })
    const res = await axios.post(SERVER_URL + '/register', body)
    const user: TUser = res.data
    return user
}

export const login = async (email: string, password: string) => {
    const body = JSON.stringify({ email, password })
    const res = await axios.post(SERVER_URL + '/login', body)
    const user: TUser = res.data
    return user
}

export const updateUser = async (token: string, phone: string) => {
    const body = JSON.stringify({ token, phone })
    const res = await axios.post(SERVER_URL + '/updateUser', body)
    const user: TUser = res.data
    return user
}

export const getEvents = async (token: string) => {
    const res = await axios.get(SERVER_URL + '/getEvents', { params: { token } })
    const events: TEvent[] = res.data
    console.log(events)
    return events
}

export const deleteEvent = async (token: string, id: number) => {
    const res = await axios.delete(SERVER_URL + '/deleteEvent', { params: { token, id } })
    const deleted_id: number = res.data
    return deleted_id
}


export const createEvent = async (token: string, event: TEvent) => {
    const body = JSON.stringify({ token, event })
    const res = await axios.post(SERVER_URL + '/createEvent', body)
    const new_event: TEvent = res.data
    return new_event
}

export const updateEvent = async (token: string, event: TEvent) => {
    const body = JSON.stringify({ token, event })
    const res = await axios.post(SERVER_URL + '/updateEvent', body)
    const new_event: TEvent = res.data
    return new_event
}


export const getContacts = async (token: string) => {
    const res = await axios.get(SERVER_URL + '/getContacts', { params: { token } })
    const contacts: TContact[] = res.data
    return contacts
}

export const createContact = async (token: string, contact: TContact) => {
    const body = JSON.stringify({ token, contact })
    const res = await axios.post(SERVER_URL + '/createContact', body)
    const new_contact: TContact = res.data
    return new_contact
}

export const updateContact = async (token: string, contact: TContact) => {
    const body = JSON.stringify({ token, contact })
    const res = await axios.post(SERVER_URL + '/updateContact', body)
    const new_contact: TContact = res.data
    return new_contact
}

export const deleteContact = async (token: string, id: number) => {
    const res = await axios.delete(SERVER_URL + '/deleteContact', { params: { token, id } })
    const deleted_id: number = res.data
    return deleted_id
}