import type { Task, BookingEntryAnswer, CorrectedBookingEntry, Assignment } from "$interfaces";
import type { PageServerLoad, Actions } from "./$types";
import getAssignmentByKey from "$lib/database/getAssignmentByKey";

export const load: PageServerLoad = async ({ params }) => {
    const assignmentAsString = await getAssignmentByKey(params.slug);
    if (!assignmentAsString) {
        throw new Error("No assignment found");
    }

    const testAssignment: Assignment = JSON.parse(assignmentAsString.value);
    // access control

    return {
        assignment: testAssignment
    };
};

export const actions = {
    checkAsnwers: async ({ request, params }) => {
        const assignmentFromDB = await getAssignmentByKey(params.slug);
        const assignment: Assignment = JSON.parse(assignmentFromDB.value);

        if (!assignment) {
            throw new Error("No assignment found");
        }

        assignment.tasks.forEach((task) => {
            task.date = new Date(task.date);
        });

        const assignmentTasks: Task[] = assignment.tasks;
        if (!assignmentTasks[0].solutions) {
            throw new Error("Assignment has no solutions");
        }

        // formating solutions
        const bookingEntrySolutions: BookingEntryAnswer[] = [];
        assignmentTasks.forEach((task) => {
            task.solutions.forEach((solution) => {
                bookingEntrySolutions.push({
                    date: task.date,
                    debitAccount: solution.debitAccount,
                    creditAccount: solution.creditAccount,
                    amount: solution.amount
                });
            });
        });

        const data = await request.formData();

        const dateAnswers = data.getAll("date");
        const debitAccountAnswers = data.getAll("debitAccount");
        const creditAccountAnswers = data.getAll("creditAccount");
        const amountAnswers = data.getAll("amount");
        const bookingEntryAnswers: BookingEntryAnswer[] = [];

        // formating answers
        dateAnswers.forEach((dateAnswer, index) => {
            bookingEntryAnswers.push({
                date: new Date(dateAnswers[index].toString()),
                debitAccount: debitAccountAnswers[index].toString(),
                creditAccount: creditAccountAnswers[index].toString(),
                amount: amountAnswers[index].toString()
            });
        });

        // Check if answers are correct
        const correctionBookingEntry: CorrectedBookingEntry[] = [];

        bookingEntrySolutions.forEach((solution, index) => {
            let currentMistakeAmount = 0;
            const submittedEntry = bookingEntryAnswers[index];

            if (
                !submittedEntry ||
                !submittedEntry.date ||
                solution.date.getTime() !== submittedEntry.date.getTime()
            ) {
                currentMistakeAmount++;
            }

            if (solution.debitAccount !== submittedEntry?.debitAccount) {
                currentMistakeAmount++;
            }

            if (solution.creditAccount !== submittedEntry?.creditAccount) {
                currentMistakeAmount++;
            }

            if (Number(solution.amount) !== Number(submittedEntry?.amount)) {
                console.log(solution.amount + " " + submittedEntry.amount);
                currentMistakeAmount++;
            }

            correctionBookingEntry.push({
                taskIndex: index,
                mistakeAmount: currentMistakeAmount,
                submitedEntry: submittedEntry
            });
        });
        return {
            success: true,
            correctedBookingEntry: JSON.stringify(correctionBookingEntry)
        };
    }
} satisfies Actions;
