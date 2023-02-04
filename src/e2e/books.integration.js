// Pruebas de integración para el endpoint '/'

// Se declara Spy para el servicio 'getAll'
const mockGetAll = jest.fn();

// Se importa 'request' para hacer peticiones al enpoint
const request = require('supertest');

// Se importa la aplicación para instanciar una nueva para las pruebas
const createApp = require('../app');

// Se importa el servicio que vamos a probar
const { generateManyBook } = require('../fakes/book.fake');

// Se configura Jest para que utilice la base de datos falsa cuando se ejecuten las pruebas
jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
    getAll: mockGetAll,
    create: () => { },
})));

// Se empiezan las pruebas e2e para el endpoint
describe('Test for books enpoint', () => {
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
    describe('Test for [GET] /api/v1/books', () => {
        test('Should return a list of books', () =>{
            
            // Arrange
            const fakeBooks = generateManyBook(3);
            mockGetAll.mockResolvedValue(fakeBooks);
            
            // Act
            return request(app)
            .get('/api/v1/books')
            .expect(200)
            .then(({ body }) => {
                //Assert
                expect(body.length).toEqual(3);
            });
        });
    });
});