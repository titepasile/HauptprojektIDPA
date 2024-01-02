export interface Assignment {
    id: string;
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
    amount: number;
}

export interface RequestAnswers {
    id: string;
    answers: Answer[];
}

export interface Answer {
    id: string;
    answers: string[];
}