import { Dialog } from '../dialog'
import { getVariantMatches, VariantMatch } from '../variants'
import { Place, places } from '../config/places'
import { Device, devices } from '../config/device'
import { getPlacesForDevice } from '../config/place-to-devices'

function arrayOrCallback<T>(value: T[] | undefined, callback: () => T[]): T[] {
    return value && value.length > 0 ? value : callback()
}

function arrayOrAsyncCallback<T>(value: T[] | undefined, callback: () => Promise<T[]>): Promise<T[]> {
    return value && value.length > 0 ? Promise.resolve(value) : callback()
}

type TurnOnContext = {
    devices: VariantMatch[]
    devicesToPlaces: [Device, Place][]
}

const DEFAULT_CONTEXT: TurnOnContext = {
    devices: [],
    devicesToPlaces: [],
}

export async function turnOnScenario(
    dialog: Dialog,
    context: TurnOnContext = structuredClone(DEFAULT_CONTEXT),
): Promise<Dialog> {
    context.devices = arrayOrCallback(context.devices, () => getVariantMatches(dialog.message, devices))

    if (context.devices.length === 0) {
        dialog = await dialog.prompt('Вы хотите включить что-то конкретное?')
        return turnOnScenario(dialog.recursive(), context)
    }

    for (const device of context.devices) {
        const placesForDevice = getPlacesForDevice(device.variantKey as Device)
        const userSubmittedPlaces = getVariantMatches(device.sentence, places)

        if (placesForDevice.length === 0) {
            await dialog.send(`Не могу найти устройство ${device.variantDisplayName}`)
            continue
        }

        if (placesForDevice.length === 1) {
            context.devicesToPlaces.push([device.variantKey as Device, placesForDevice[0]])
        } else if (userSubmittedPlaces.length === 0) {
            const subdialog = await dialog.prompt(`Где вы хотите включить ${device.variantDisplayName}?`)
            const requestedPlacesForDevice = getVariantMatches(subdialog.message, places)

            for (const place of requestedPlacesForDevice) {
                if (placesForDevice.includes(place.variantKey as Place)) {
                    context.devicesToPlaces.push([device.variantKey as Device, place.variantKey as Place])
                } else {
                    await subdialog.send(
                        `Не могу найти девайс ${device.variantDisplayName} ${place.variantDisplayName}`,
                    )
                }
            }
        } else {
            for (const place of userSubmittedPlaces) {
                if (placesForDevice.includes(place.variantKey as Place)) {
                    context.devicesToPlaces.push([device.variantKey as Device, place.variantKey as Place])
                } else {
                    await dialog.send(`Не могу найти девайс ${device.variantDisplayName} ${place.variantDisplayName}`)
                }
            }
        }
    }

    console.log(context)

    return dialog
}
