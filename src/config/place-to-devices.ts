import { Place } from './places'
import { Device } from './device'

export const placeToDevices: Record<Place, Device[]> = {
    [Place.Kitchen]: [Device.Light, Device.TV],
    [Place.Bathroom]: [Device.Light],
    [Place.LivingRoom]: [Device.Light, Device.TV],
    [Place.Bedroom]: [Device.Light, Device.AirConditioner],
    [Place.Hallway]: [Device.Light],
    [Place.Office]: [Device.Light],
    [Place.Terrace]: [Device.Light],
}

export const getPlacesForDevice = (device: Device): Place[] =>
    Object.entries(placeToDevices)
        .filter(([, devices]) => devices.includes(device))
        .map(([place]) => place as Place)

export const getDevicesForPlace = (place: Place): Device[] => placeToDevices[place]
