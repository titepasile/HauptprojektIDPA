import { Deta } from "deta";

const deta = Deta();
const assignmentDb = deta.Base("assignments");

export default assignmentDb;
