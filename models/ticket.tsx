
export type Status = 'new' | 'in progress' | 'resolved';

export interface Ticket {
    id: string;
    userId?: string;
    name: string;
    email: string;
    description: string;
    photo?: string;
    status: Status;
}