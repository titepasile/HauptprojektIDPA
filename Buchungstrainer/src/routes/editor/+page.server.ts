import type { Assignment } from "$interfaces";
import { fail } from "@sveltejs/kit";
import insertAssignments from "$lib/database/insertAssignments";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async () => {
    const newAssignment: Assignment = {
        authorId: "",
        title: "",
        description: "",
        tasks: [
            {
                date: new Date(),
                description: "",
                solutions: [
                    {
                        debitAccount: "",
                        creditAccount: "",
                        amount: ""
                    }
                ]
            }
        ]
    };

    return {
        assignment: newAssignment
    };
};

export const actions = {
    createAssignment: async ({ request }) => {
        const data = await request.formData();
        const formAssignment = data.get("newAssignment");

        if (!formAssignment) {
            return fail(400, { newAssignment: formAssignment, missing: true });
        }

        const newAssignment: Assignment = formAssignment;
        const result = await insertAssignments(newAssignment);

        return {
            success: true,
            body: result
        };
    }
} satisfies Actions;
