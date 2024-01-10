import { Deta } from "deta";

export default function assignmentDb() {
    const deta = Deta();
    const assignmentDb = deta.Base("assignments");
    return assignmentDb;
}
