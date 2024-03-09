import { CYRILLIC_LETTER, escape } from '../regex'
import { Variant } from '../variants'

export const enum Place {
    Kitchen = 'place.kitchen',
    Bathroom = 'place.bathroom',
    LivingRoom = 'place.living_room',
    Bedroom = 'place.bedroom',
    Hallway = 'place.hallway',
    Office = 'place.office',
    Terrace = 'place.terrace',
}

export const places: Variant[] = [
    {
        key: Place.Kitchen,
        displayName: 'на кухне',
        triggerParts: [
            escape('кухн').then(CYRILLIC_LETTER.times(1, 2)), // кухня
            escape('кухон').then(CYRILLIC_LETTER.times(1, 5)), // кухонь, кухонный
        ],
    },
    {
        key: Place.Bathroom,
        displayName: 'в ванной',
        triggerParts: [
            escape('ванн').then(CYRILLIC_LETTER.times(1, 2)), // ванна
            escape('душ').then(CYRILLIC_LETTER.times(1, 2)), // душ
            escape('душев').then(CYRILLIC_LETTER.times(1, 2)), // душевая
        ],
    },
    {
        key: Place.LivingRoom,
        displayName: 'в гостиной',
        triggerParts: [
            escape('гостин').then(CYRILLIC_LETTER.times(1, 5)), // гостиная
            escape('зал').then(CYRILLIC_LETTER.times(1, 5)), // зал
        ],
    },
    {
        key: Place.Bedroom,
        displayName: 'в спальне',
        triggerParts: [
            escape('спальн').then(CYRILLIC_LETTER.times(1, 5)), // спальня
        ],
    },
    {
        key: Place.Hallway,
        displayName: 'в прихожей',
        triggerParts: [
            escape('прихож').then(CYRILLIC_LETTER.times(1, 5)), // прихожая
            escape('коридор').then(CYRILLIC_LETTER.times(1, 5)), // коридор
        ],
    },
    {
        key: Place.Office,
        displayName: 'в офисе',
        triggerParts: [
            escape('офис').then(CYRILLIC_LETTER.times(1, 5)), // офис
            escape('рабоч').then(CYRILLIC_LETTER.times(1, 5)), // рабочий
            escape('кабинет').then(CYRILLIC_LETTER.times(1, 5)), // кабинет
        ],
    },
    {
        key: Place.Terrace,
        displayName: 'на террасе',
        triggerParts: [
            escape('террас').then(CYRILLIC_LETTER.times(1, 5)), // терраса
            escape('терас').then(CYRILLIC_LETTER.times(1, 5)), // терасcа (mistake)
        ],
    },
]
