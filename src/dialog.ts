import { createInterface } from 'node:readline/promises'
import { stdin, stdout } from 'node:process'

const rl = createInterface({ input: stdin, output: stdout })

export interface Dialog {
    readonly message: string

    /**
     * Ask a question to the dialog and wait for a response
     * @param question
     */
    prompt(question: string): Promise<Dialog>

    /**
     * Just send a message to the dialog
     * @param question
     */
    send(question: string): Promise<Dialog>
}

export class ConsoleDialog implements Dialog {
    constructor(readonly message: string) {}

    async prompt(question: string): Promise<Dialog> {
        const answer = await rl.question(`\n<< ${question}\n>> `)

        return new ConsoleDialog(answer)
    }

    async send(question: string): Promise<Dialog> {
        rl.write(`\n<< ${question}\n`)
        return this
    }
}
