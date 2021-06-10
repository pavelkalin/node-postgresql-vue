describe('Example', () => {
    beforeAll(() => {
        console.log('running before all tests')
    })

    afterAll(() => {
        console.log('running after all tests')
    })

    beforeEach(() => {
        console.log('running before each test')
    })

    afterEach(() => {
        console.log('running after each test')
    })

    it('Should do something', () => {
        console.log('first test')
    })

    it('Should do something else', () => {
        console.log('second test')
    })
})