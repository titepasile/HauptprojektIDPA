import type { PageServerLoad } from "./$types";
import getAssignments from "$lib/database/getAssignments";

export const load: PageServerLoad = async () => {
    const assignments = await getAssignments();

    return {
        assignment: assignments
    };
};