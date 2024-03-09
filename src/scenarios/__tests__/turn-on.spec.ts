import { describe, it, expect, test } from 'vitest'
import { turnOnScenario } from '../turn-on'
import { TestingDialog } from '../../dialog'
import { Device } from '../../config/device'
import { Place } from '../../config/places'

describe('turn on', () => {
    it('когда есть девайс и место', async () => {
        const dialog = new TestingDialog('включи свет в ванной')
        const [, context] = await turnOnScenario(dialog)
        expect(context.devicesToPlaces).toEqual([[Device.Light, Place.Bathroom]])
    })

    it('когда есть девайс и несколько мест', async () => {
        const dialog = new TestingDialog('включи свет в ванной и в спальне')
        const [, context] = await turnOnScenario(dialog)
        expect(context.devicesToPlaces).toEqual([
            [Device.Light, Place.Bathroom],
            [Device.Light, Place.Bedroom],
        ])
    })

    it('когда есть девайс, но места не указаны', async () => {
        const dialog = new TestingDialog('включи свет')
        const promise = turnOnScenario(dialog)
        expect(dialog.latestAssistantMessage).toEqual('Где вы хотите включить свет?')

        await dialog.resolve('в ванной')
        const [, context] = await promise
        expect(context.devicesToPlaces).toEqual([[Device.Light, Place.Bathroom]])
    })

    it('когда нет девайса', async () => {
        const dialog = new TestingDialog('включи что-то')
        const promise = turnOnScenario(dialog)
        expect(dialog.latestAssistantMessage).toEqual('Вы хотите включить что-то конкретное?')

        await dialog.resolve('свет')
        expect(dialog.latestAssistantMessage).toEqual('Где вы хотите включить свет?')

        await dialog.resolve('в ванной')
        const [, context] = await promise
        expect(context.devicesToPlaces).toEqual([[Device.Light, Place.Bathroom]])
    })

    it('когда есть несколько девайсов и место', async () => {
        const dialog = new TestingDialog('включи свет, кондер и телевизор на кухне')
        const promise = turnOnScenario(dialog)
        expect(dialog.latestAssistantMessage).toEqual('Где вы хотите включить свет?')

        await dialog.resolve('в прихожей и в ванной')
        const [, context] = await promise
        expect(context.devicesToPlaces).toEqual([
            [Device.Light, Place.Bathroom],
            [Device.Light, Place.Hallway],
            [Device.AirConditioner, Place.Bedroom],
            [Device.TV, Place.Kitchen],
        ])
    })
})
