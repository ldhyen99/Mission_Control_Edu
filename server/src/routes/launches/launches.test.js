//npm run test -- test-name
// run only 1 file to test

const request = require('supertest')
const app = require('../../app')

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
        .get('/launches')
        .expect('Content-Type', /json/)
        .expect(200);
    })
})

describe('Test POST /launch',() => {
   
    const completeLaunchData = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-f',
        target: 'Kepler-186 f',
        launchDate: 'September 15, 2028',
    }

    const lauchDateWithoutDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-f',
        target: 'Kepler-186 f',
    }

    const lauchDateWithInvalidDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-f',
        target: 'Kepler-186 f',
        launchDate: 'zoot',
    }
    test('It should respond with 201 created', async () => {
        const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(lauchDateWithoutDate);

       
    })
    test('It should catch missing require properties', async () => {
        const response = await request(app)
            .post('/launches')
            .send(lauchDateWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Missing required launch property',
        })
    })
    test('It should catch invalid dates', async () => {
        const response = await request(app)
        .post('/launches')
        .send(lauchDateWithInvalidDate)
        .expect('Content-Type', /json/)
        .expect(400);

        expect(response.body).toStrictEqual({
            error: "Invalid launch date", 
        })
    })
})