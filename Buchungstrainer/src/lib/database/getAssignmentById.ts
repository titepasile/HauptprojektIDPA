import type { Assignment } from "$interfaces";
import assignmentDb from "./assignmentDb";

export default async function getAssignmentById(key: string): Promise<Assignment> {
    const response = await assignmentDb.get(key);

    if (!response) {
        throw new Error("Failed to fetch assignments");
    }

    const assignment = response as unknown;

    return assignment as Assignment;
}
