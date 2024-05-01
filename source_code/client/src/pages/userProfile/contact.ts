import { Activities } from './activities';
import { Task } from './task';
import { Opportunities } from './opportunities';
import { CONTACT_STATUS_LIST } from './constants';

export type ContactStatus = (typeof CONTACT_STATUS_LIST)[number];

interface State {
    stateShort: string;
}

export interface Contact {
    id: number,
    name: string,
    status: ContactStatus,
    city: string,
    state: State,
    zipCode: number,
    activities: Activities,
    opportunities: Opportunities,
    tasks: Task[],
    address: string,
    firstName: string,
    lastName: string,
    position: string,
    manager: string,
    company: string,
    phone: string,
    email: string,
    image: string,
}