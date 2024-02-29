
type Status = 'new' | 'in progress' | 'resolved';

export interface Ticket {
    id?: number;
    name: string;
    email: string;
    description: string;
    photo?: string;
    status: Status;
}