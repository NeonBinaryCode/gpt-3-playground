import { Configuration, OpenAIApi } from 'openai';
import { config } from 'dotenv';
import PromptSync from 'prompt-sync';
import chalk from 'chalk';

config();
const prompt = PromptSync();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

(async () => {
    while (true) {
        let input = prompt(chalk.blue.bold('Prompt: '));

        if (input == 'exit') {
            console.log('See you next time!');
            break;
        }

        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: input,
            temperature: 0.7,
            max_tokens: 1500,
            top_p: 1,
            frequency_penalty: 0.1,
            presence_penalty: 0.05,
        });

        console.log();
        response.data.choices.forEach((choice) =>
            console.log(
                chalk.green.bold('Response: ') + chalk.italic(choice.text)
            )
        );
    }
})();
