//npm run test -- test-name
// run only 1 file to test

const request = require('supertest')
const app = require('../../app')

describe('Test GET /planets', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
        .get('/planets')
        .expect('Content-Type', /json/)
        .expect(200)
    })
})