import { ConsoleDialog, Dialog } from './dialog'
import { getIntentMatches } from './intent'
import { intents } from './config/intents'

const consoleDialog = new ConsoleDialog('')

async function dispatchingDialog(dialog: Dialog) {
    dialog = await dialog.prompt('Какой ваш запрос?')

    const intentMatches = getIntentMatches(dialog.message, intents)

    if (intentMatches.length === 0) {
        dialog = await dialog.send('Я не понял ваш запрос')
        return dispatchingDialog(dialog)
    }

    for (const intentMatch of intentMatches) {
        switch (intentMatch.intentKey) {
            case 'turn.on':
                dialog = await turnOnDialog(dialog)
                break
            case 'turn.off':
                dialog = await turnOffDialog(dialog)
                break
            default:
                dialog = await dialog.send('Что-то пошло не так, соре :/')
        }
    }
}

async function turnOnDialog(dialog: Dialog): Promise<Dialog> {
    dialog = await dialog.send('Включаю')
    return dialog
}

async function turnOffDialog(dialog: Dialog): Promise<Dialog> {
    dialog = await dialog.send('Выключаю')
    return dialog
}

dispatchingDialog(consoleDialog)
