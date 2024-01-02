import type { Assignment } from "$interfaces";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	// fetch data from db here
    // ...

    // mock data
    const testData: Assignment = {
        id: params.slug,
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
    return {
        assignment: testData
    };
};