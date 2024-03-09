import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

const reportsDir = resolve(__dirname, 'coverage')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig((_) => {
    return {
        plugins: [],
        test: {
            globals: true,
            environment: 'jsdom',
            // setupFiles: './configs/vitest-setup.ts',
            // globalSetup: './configs/vitest-globals.ts',
            coverage: {
                provider: 'v8',
                reportsDirectory: reportsDir,
            },
            reporters: ['junit'],
        },
    }
})
