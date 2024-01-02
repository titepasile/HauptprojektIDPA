import type { Assignment } from "../../interfaces";

export function getAssignments(id: string): Assignment {
    const testData: Assignment = {
        id: id,
        authorId: "1",
        title: "TestData",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque tempore, fuga temporibus impeditdolorem atque",
        tasks: [
            {
                date: new Date("2019-01-18"),
                description: "Es werden Waren im Wert von 500 CHF auf Rechnung eingekauft.",
                solutions: [
                    {
                        debitAccount: "Warenaufwand",
                        creditAccount: "VLL",
                        amount: 500
                    }
                ]
            },
            {
                date: new Date("2019-02-16"),
                description: "Es werden Waren im Wert von 600 CHF auf Rechnung verkauft.",
                solutions: [
                    {
                        debitAccount: "FLL",
                        creditAccount: "Warenertrag",
                        amount: 600
                    }
                ]
            }
        ]
    };

    return testData;
}
