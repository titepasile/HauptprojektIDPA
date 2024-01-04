import type { Assignment } from "$interfaces";
import type { ObjectType } from "deta/dist/types/types/basic";
import assignmentDb from "./assignmentDb";

export default async function updateAssignment(assignment: Assignment): Promise<void> {
    if (!assignment.key) {
        throw new Error("Assignment has no key. Please use insertAssignment instead.");
    }

    await assignmentDb.update(assignment as unknown as ObjectType, assignment.key);
}
