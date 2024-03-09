import { createInterface } from 'node:readline/promises'
import { stdin, stdout } from 'node:process'

const rl = createInterface({ input: stdin, output: stdout })

export abstract class Dialog {
    protected _message: string

    get message(): string {
        return this._message
    }

    private retryCount = 0

    constructor(message: string) {
        this._message = message
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
        this._message = await rl.question(`\n<< ${question}\n>> `)
        return this
    }

    async send(question: string): Promise<Dialog> {
        rl.write(`\n<< ${question}\n`)
        return this
    }
}

export class TestingDialog extends Dialog {
    resolve: (value: string) => Promise<void> = () => Promise.resolve()
    latestAssistantMessage: string = ''

    async prompt(question: string): Promise<Dialog> {
        this.latestAssistantMessage = question

        this._message = await new Promise<string>((resolve) => {
            this.resolve = async (value: string) => {
                resolve(value)
                await new Promise((resolve) => setTimeout(resolve, 0))
            }
        })

        return this
    }

    async send(question: string): Promise<Dialog> {
        this.latestAssistantMessage = question

        return this
    }
}
