import assignmentDb from "./assignmentDb";

export default async function deleteAssignment(key: string): Promise<null> {
    return await assignmentDb().delete(key);
}
