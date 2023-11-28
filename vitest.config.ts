import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		environmentMatchGlobs: [
			// all tests in tests/dom will run in jsdom
			['test/**', 'jsdom']
		]
	}
})
