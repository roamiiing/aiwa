import { CYRILLIC_LETTER, escape } from '../regex'
import { Variant } from '../variants'

export const enum Intent {
    TurnOn = 'intent.turn.on',
    TurnOff = 'intent.turn.off',
}

export const intents: Variant[] = [
    {
        key: Intent.TurnOn,
        displayName: 'включить',
        triggerParts: [
            escape('включ').then(CYRILLIC_LETTER.times(1, 5)), // включи
            escape('запус').then(CYRILLIC_LETTER.times(1, 7)), // запускай
            escape('старт').then(CYRILLIC_LETTER.times(0, 7)), // стартуй
            escape('пуск').then(CYRILLIC_LETTER.times(0, 7)), // пускай
            escape('зажиг').then(CYRILLIC_LETTER.times(2, 7)), // зажигай
            escape('зажг').then(CYRILLIC_LETTER.times(1, 7)), // зажги
            escape('заже').then(CYRILLIC_LETTER.times(2, 7)), // зажечь
            escape('постав').then(CYRILLIC_LETTER.times(2, 7)), // поставь
            escape('установ').then(CYRILLIC_LETTER.times(2, 7)), // установи
            escape('вруб').then(CYRILLIC_LETTER.times(1, 5)), // вруби
        ],
    },
    {
        key: Intent.TurnOff,
        displayName: 'выключить',
        triggerParts: [
            escape('выключ').then(CYRILLIC_LETTER.times(1, 5)), // выключи
            escape('останов').then(CYRILLIC_LETTER.times(2, 7)), // останови
            escape('стоп').then(CYRILLIC_LETTER.times(0, 7)), // стопай
            escape('выруб').then(CYRILLIC_LETTER.times(1, 5)), // выруби
        ],
    },
]
