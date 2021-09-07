const sinon = require('sinon');
const handler = require('../handler');
const controllerPatient = require('../components/patient/controller');

describe('Test Handler', () => {
    test('Data Success', async () => {
        const stub = sinon.stub(controllerPatient, "listPatient");
        stub.returns([]);

        const response = await handler.getPatient();
        const data = JSON.parse(response.body);
        expect(data.input.length).toBe(0);
        controllerPatient.listPatient.restore();
    });

    test('Data Not Found', async () => {
        const stub = sinon.stub(controllerPatient, "listPatient");
        stub.returns(null);

        const response = await handler.getPatient();
        const data = JSON.parse(response.body);
        expect(data.input).toBe(null);
        controllerPatient.listPatient.restore();
    });

    test('Error GET Data', async () => {
        const stub = sinon.stub(controllerPatient, "listPatient");
        stub.throws(new Error('Internal server error'));

        const response = await handler.getPatient();
        const data = JSON.parse(response.body);
        expect(data.input).toBe('[response error] Error: Internal server error');
        controllerPatient.listPatient.restore();
    });
});