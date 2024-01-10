import type { Assignment } from "$interfaces";
import assignmentDb from "./assignmentDb";

export default async function getAssignments(): Promise<Assignment[]> {
    const response = await assignmentDb().fetch();

    if (!response) {
        throw new Error("Failed to fetch assignments");
    }

    const assignments = response.items as unknown;

    return assignments as Assignment[];
}
