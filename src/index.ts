import { ConsoleDialog, Dialog } from './dialog'
import { getVariantMatches } from './variants'
import { Intent, intents } from './config/intents'
import { turnOnScenario } from './scenarios/turn-on'

const consoleDialog = new ConsoleDialog('')

async function dispatchingDialog(dialog: Dialog) {
    dialog = await dialog.prompt('Какой ваш запрос?')

    const intentMatches = getVariantMatches(dialog.message, intents)

    if (intentMatches.length === 0) {
        dialog = await dialog.send('Я не понял ваш запрос')
        return dispatchingDialog(dialog)
    }

    for (const intentMatch of intentMatches) {
        switch (intentMatch.variantKey) {
            case Intent.TurnOn:
                dialog = await turnOnScenario(dialog)
                break
            case Intent.TurnOff:
                dialog = await turnOffDialog(dialog)
                break
            default:
                dialog = await dialog.send('Что-то пошло не так, соре :/')
        }
    }
}

async function turnOffDialog(dialog: Dialog): Promise<Dialog> {
    dialog = await dialog.send('Выключаю')
    return dialog
}

dispatchingDialog(consoleDialog)
