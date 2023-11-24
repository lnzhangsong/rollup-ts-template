const { sayHelloWorld } = require('../dist/index.js')

test('测试', () => {
	const hello = sayHelloWorld()
	const testStr = 'hello world'
	expect(hello).toEqual(testStr)
})
