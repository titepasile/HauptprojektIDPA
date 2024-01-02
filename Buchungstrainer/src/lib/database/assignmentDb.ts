import { Deta } from "deta";

const deta = Deta();
const db = deta.Base("assignments");

export default db;
