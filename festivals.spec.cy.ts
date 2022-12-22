export interface Bands {
    "name": String,
    "recordLabel": String
}

export interface Festivals {
    "name": String,
    "bands": Bands[]
}

describe('Validating music festival data', () => {
    it('fetch festivals data - GET', () => {
        getRequest()
    });
});
let retries = 1;
function getRequest():any {
    retries++
    return cy.request({ method: 'GET', url: '/api/v1/festivals', failOnStatusCode: false }).then(resp => {
        if (resp.status === 200) {
            expect(resp.status).to.eq(200)
            assert.isArray(resp.body, 'Response is an array')
            expect(resp.body as Festivals[])
           // cy.log(JSON.stringify(resp.body))
        }
        else if (resp.status === 429 && retries < 3) {
            cy.log('Retrying')
            assert.isString(resp.body, 'Request throttled')
            return getRequest()
        }
    })
}