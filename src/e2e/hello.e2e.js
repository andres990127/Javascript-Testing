// Pruebas e2e para el endpoint '/'

// Se importa 'request' para hacer peticiones al enpoint
const request = require('supertest');

// Se importa la aplicación para instanciar una nueva para las pruebas
const createApp = require('../app');

// Se empiezan las pruebas e2e para el endpoint
describe('Test for hello enpoint', () => {
    let app = null;
    let server = null;

    // Antes de ejecutar cualquier cosa se crea y corre la aplicación
    beforeAll(() => {
        app = createApp();
        server = app.listen(3001);
    })
 
    // Cuando se terminen todas las pruebas se cierra la aplicación
    afterAll(async () => {
        await server.close();
    });

    // Se crea el test para el GET al endpoint
    describe('Test for [GET] /', () => {
        test('Should return "Hello World!"', () =>{
            return request(app)
            .get('/')
            .expect(200)
            .then((response) => {
                expect(response.text).toEqual('Hello World!');
            });
        });
    });
});