// Ejecutar "npm run test" para correr el test

// Se importa el servicio que vamos a probar
const BooksService = require('../services/books.service');

// Se crean datos falsos que suponen contenido de la base de datos
const fakeBooks = [
    {
        _id: 1,
        name: 'Harry Potter',
    },
    {
        _id: 2,
        name: 'Otro libro',
    },
];

// Se crea una base de datos falsa con todos sus métodos para CRUD
const MongoLibStub = {
    getAll: () => [...fakeBooks],
    create: () => { }
}

// Se configura Jest para que utilice la base de datos falsa cuando se ejecuten las pruebas
jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => MongoLibStub));

// Prueba para el servicio BookService
describe('Test for BookService', () => {
    let service;

    // Antes de cada prueba se instancia un nuevo service
    beforeEach(() => {
        service = new BooksService();
        jest.clearAllMocks();
    })

    // Prueba para el servicio que obtiene todos los libros
    describe('Test for getBooks', () => {
        test('Should return a list of books', async () => { // AAA
            // Arrange

            // Act
            const books = await service.getBooks(); // Se obtienen todos los libros
            // Asert
            expect(books.length).toEqual(2); // Se espera que solo vengan 2 ya que esa es la cantidad fake que creamos
        })
    })
})