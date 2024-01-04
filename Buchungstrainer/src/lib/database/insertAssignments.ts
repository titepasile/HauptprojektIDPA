import type { Assignment } from "$interfaces";
import type { ObjectType } from "deta/dist/types/types/basic";
import assignmentDb from "./assignmentDb";

export default async function insertAssignments(content: Assignment): Promise<ObjectType> {
    return assignmentDb.insert(content as unknown as ObjectType);
}
