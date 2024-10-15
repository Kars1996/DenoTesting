class Quiz {
    private static _questions: {
        question: string;
        options: string[];
        answer: string;
    }[];

    constructor() {
        Quiz._questions = [
            {
                question: "What is the capital of France?",
                options: ["Paris", "Berlin", "Madrid", "Rome"],
                answer: "Paris",
            },
            {
                question: "Who won the Nobel Prize in Literature in 2020?",
                options: [
                    "Jane Austen",
                    "Ernest Hemingway",
                    "William Shakespeare",
                    "Virginia Woolf",
                ],
                answer: "Jane Austen",
            },
            {
                question: "Who is the best developer?",
                options: ["Bill Gates", "Mark Zuckerberg", "Google", "Kars"],
                answer: "Kars",
            },
        ];
    }

    public static startQuiz(): void {
        let score = 0;
        for (const question of this._questions) {
            console.log(question.question);
            question.options.forEach((option) => console.log(`- ${option}`));

            let userAnswer: string | null =
                prompt("Enter your answer >")?.toLowerCase() || "";
            while (userAnswer.length === 0) {
                console.log("Answer cannot be empty.");
                userAnswer = prompt("Enter your answer >")?.toLowerCase() || "";
            }

            if (userAnswer === question.answer.toLowerCase()) {
                score += 5;
                console.log("Correct!");
            } else {
                console.log(`Incorrect, the answer was '${question.answer}'!`);
            }
        }
        console.log(
            `Your final score is ${score}/${this._questions.length * 5}`
        );
    }

    public static testQuiz(): void {
        this.startQuiz();
    }
}

if (import.meta.main) {
    Quiz.testQuiz();
}
