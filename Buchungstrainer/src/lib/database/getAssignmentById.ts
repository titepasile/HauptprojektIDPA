import type { Assignment } from "$interfaces";
import assignmentDb from "./assignmentDb";

export default async function getAssignmentById(id: string): Promise<Assignment> {
    const response = await assignmentDb.get(id);

    if (!response) {
        throw new Error("Failed to fetch assignments");
    }

    const assignment = response as unknown;

    return assignment as Assignment;
}
