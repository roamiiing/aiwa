import { createInterface } from 'node:readline/promises'
import { stdin, stdout } from 'node:process'

const rl = createInterface({ input: stdin, output: stdout })

export abstract class Dialog {
    readonly message: string

    private retryCount = 0

    constructor(message: string) {
        this.message = message
    }

    /**
     * Ask a question to the dialog and wait for a response
     * @param question
     */
    abstract prompt(question: string): Promise<Dialog>

    /**
     * Just send a message to the dialog
     * @param question
     */
    abstract send(question: string): Promise<Dialog>

    recursive(): Dialog {
        this.retryCount++
        console.log('recursive call', this.retryCount)
        return this
    }
}

export class ConsoleDialog extends Dialog {
    async prompt(question: string): Promise<Dialog> {
        const answer = await rl.question(`\n<< ${question}\n>> `)

        return new ConsoleDialog(answer)
    }

    async send(question: string): Promise<Dialog> {
        rl.write(`\n<< ${question}\n`)
        return this
    }
}
