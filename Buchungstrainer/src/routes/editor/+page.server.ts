import type { Assignment } from "$interfaces";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async () => {
    const newAssignment: Assignment = {
        authorId: "",
        title: "",
        description: "",
        tasks: [{
            date: new Date(),
            description: "",
            solutions:[{
                debitAccount: "",
                creditAccount: "",
                amount: ""
            }]
        }]
    };

    return {
        assignment: newAssignment
    };
};

export const actions = {
    createAssignment: async ({ request }) => {
        const data = await request.formData();
        console.log(data.get("newAssignment"));
    }
} satisfies Actions;