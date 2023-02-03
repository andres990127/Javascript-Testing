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

// Se declara Spy para el servicio 'getAll'
const mockGetAll = jest.fn();

// Se configura Jest para que utilice la base de datos falsa cuando se ejecuten las pruebas
jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
    getAll: mockGetAll,
    create: () => { },
})));


// Prueba para el servicio BookService
describe('Test for BookService', () => {
    let service;

    // Antes de cada prueba se instancia un nuevo service
    beforeEach(() => {
        service = new BooksService();
        jest.clearAllMocks();
    });

    // Test para probar el servicio 'getBooks'
    describe('test for getBooks', () => {
        test('should return a list book', async () => {
            // Arrange
            mockGetAll.mockResolvedValue(fakeBooks);
            // Act
            const books = await service.getBooks({});
            console.log(books);
            // Assert
            expect(books.length).toEqual(2); // Se esperan 2 libros ya que eso es lo que tenemos en la data fake
            expect(mockGetAll).toHaveBeenCalled(); // Se espera que este mockSpy sea llamado 
            expect(mockGetAll).toHaveBeenCalledTimes(1); // Se espera que este mockSpy sea llamado una vez 
            expect(mockGetAll).toHaveBeenCalledWith('books', {}); // Se espera que se le llame con el parámetro 'books'
        });

        // Test para probar que el primer libro se llame 'Harry potter 2'
        test('should return a list book', async () => {
            mockGetAll.mockResolvedValue([{ // Se le pasa una data quemada para esta prueba
                _id: 1,
                name: 'Harry potter 2',
            }]);
            const books = await service.getBooks({});
            console.log(books);
            expect(books[0].name).toEqual('Harry potter 2');
        });
    });
})