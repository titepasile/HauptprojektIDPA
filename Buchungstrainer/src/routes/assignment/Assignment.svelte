<script lang="ts">
    import type { Assignment, Task } from "../../interfaces.js";
    import AssignmentTable from "./AssignmentTable.svelte";
    import TaskTable from "./TaskTable.svelte";

    const assignment: Assignment = {
        id: "1",
        title: "Test",
        description: "Test",
        authorId: "1",
        tasks: [
            {
                date: new Date(),
                description: "Test",
                solutions: [
                    {
                        debitAccount: "Test",
                        creditAccount: "Test",
                        amount: 1
                    }
                ]
            }
        ]
    };
    const tasks: Task[] = assignment.tasks;
</script>

<div class="WholeContainer">
    <div class="PartContainer">
        <div class="PartContent">
            <h1>{assignment.title}</h1>
            <div>{assignment.description}</div>
            <AssignmentTable tableData={tasks} />
        </div>
    </div>
    <div class="PartContainer">
        <div class="PartContent">
            <div>Text</div>
            <form method="post" action="/checkAnswers">
                <TaskTable tableData={tasks} />
                <input type="submit" value="Fertig" />
            </form>
        </div>
    </div>
</div>

<style>
    :global(body) {
        height: 100vh;
        margin: 0;
        padding: 0;
    }

    .WholeContainer {
        display: grid;
        grid-template-columns: 40% auto;
        grid-template-rows: 100vh;
    }

    .PartContainer {
        height: 100%;
        overflow: auto;
    }

    .PartContent {
        padding: 2rem;
    }

    @media screen and (max-width: 992px) {
        .WholeContainer {
            background-color: blue;
        }
    }
</style>
