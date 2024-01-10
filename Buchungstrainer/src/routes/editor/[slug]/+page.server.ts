import type { Assignment } from "$interfaces";
import { fail } from "@sveltejs/kit";
import getAssignmentByKey from "$lib/database/getAssignmentByKey";
import getAssignments from "$lib/database/getAssignments";
import updateAssignment from "$lib/database/updateAssignment";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const assignmentAsString = await getAssignmentByKey(params.slug);
    getAssignments();

    if (!assignmentAsString) {
        throw new Error("No assignment found");
    }

    const assignment: Assignment = JSON.parse(assignmentAsString.value);

    return {
        assignment: assignment
    };
};

export const actions = {
    createAssignment: async ({ request, params }) => {
        const data = await request.formData();
        const formAssignment = data.get("newAssignment");

        if (!formAssignment) {
            return fail(400, { editedAssignment: formAssignment, missing: true });
        }

        const editedAssignment: Assignment = JSON.parse(formAssignment.toString()) as Assignment;
        editedAssignment.key = params.slug;
        const result = await updateAssignment(editedAssignment);

        return {
            success: true,
            body: result
        };
    }
} satisfies Actions;
