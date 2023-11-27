import { expect, test } from 'vitest'
import { sayHelloWorld } from '../dist'

test('测试', () => {
	const hello = sayHelloWorld()
	const testStr = 'hello world'
	expect(hello).toEqual(testStr)
})
