export interface Assignment {
    id: string;
    authorId: string;
    title: string;
    description: string;
    tasks: Task[];
}

export interface Task {
    date: number;
    description: string;
    solutions: BookingEntry[];
}

export interface BookingEntry {
    debitAccount: string;
    creditAccount: string;
    amount: string;
}
