import { Variant } from '../variants'
import { anyOf, CYRILLIC_LETTER, escape, raw } from '../regex'

export const enum Device {
    Light = 'device.light',
    AirConditioner = 'device.air_conditioner',
    // Heater = 'device.heater',
    TV = 'device.tv',
    // Music = 'device.music',
    // VacuumCleaner = 'device.vacuum_cleaner',
    // Door = 'device.door',
    // Window = 'device.window',
    // Curtain = 'device.curtain',
    // Humidifier = 'device.humidifier',
    // WaterHeater = 'device.water_heater',
    // Refrigerator = 'device.refrigerator',
    // Oven = 'device.oven',
    // Microwave = 'device.microwave',
    // Dishwasher = 'device.dishwasher',
    // Boiler = 'device.boiler',
}

export const devices: Variant[] = [
    {
        key: Device.Light,
        displayName: 'свет',
        triggerParts: [
            escape('свет').then(CYRILLIC_LETTER.times(0, 5)), // свет
            escape('ламп').then(CYRILLIC_LETTER.times(0, 5)), // лампа
            escape('люстр').then(CYRILLIC_LETTER.times(1, 5)), // люстра
            escape('освещени').then(CYRILLIC_LETTER.times(1, 5)), // освещение
        ],
    },
    {
        key: Device.AirConditioner,
        displayName: 'кондиционер',
        triggerParts: [
            escape('кондиционер').then(CYRILLIC_LETTER.times(0, 5)), // кондиционер
            escape('кондёр').then(CYRILLIC_LETTER.times(0, 5)), // кондёр
            escape('конде').then(CYRILLIC_LETTER.times(1, 5)), // кондер, кондей
        ],
    },
    {
        key: Device.TV,
        displayName: 'телевизор',
        triggerParts: [
            escape('телевизор').then(CYRILLIC_LETTER.times(0, 5)), // телевизор
            raw('тел[еи]к').then(CYRILLIC_LETTER.times(0, 5)), // телек
            escape('тв').then(CYRILLIC_LETTER.times(0, 5)), // тв
        ],
    },
]
