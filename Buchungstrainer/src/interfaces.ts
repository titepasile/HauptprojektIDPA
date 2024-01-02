export interface Assignment {
    // "id" will not work due to the DB
    key: string;
    authorId: string;
    title: string;
    description: string;
    tasks: Task[];
}

export interface Task {
    date: Date;
    description: string;
    solutions: BookingEntry[];
}

export interface BookingEntry {
    debitAccount: string;
    creditAccount: string;
    amount: string;
}
