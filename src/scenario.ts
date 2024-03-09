import { Dialog } from './dialog'

export type Scenario<Ctx> = (dialog: Dialog, context?: Ctx) => Promise<[Dialog, Ctx]>
