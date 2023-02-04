/* eslint-disable max-len */
// Ejecutar "npm run test" para correr el test

// Se importa el servicio que vamos a probar
const { generateManyBook } = require('../fakes/book.fake');
const BooksService = require('./books.service');

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
      const fakeBooks = generateManyBook(20); // Se generan datos de 20 libros en un array
      mockGetAll.mockResolvedValue(fakeBooks); // Se envia la data para la prueba
      // Act
      const books = await service.getBooks({});
      console.log(books);
      // Assert
      expect(books.length).toEqual(fakeBooks.length); // Se espera que se obtenga la misma cantidad de libros que se generaron
      expect(mockGetAll).toHaveBeenCalled(); // Se espera que este mockSpy sea llamado
      expect(mockGetAll).toHaveBeenCalledTimes(1); // Se espera que este mockSpy sea llamado una vez
      expect(mockGetAll).toHaveBeenCalledWith('books', {}); // Se espera que se le llame con el parámetro 'books'
    });

    // Test para probar que el primer nombre del libro recibido tenga el nombre del primero libro generado
    test('should return a list book', async () => {
      const fakeBooks = generateManyBook(4); // Se generan datos de 20 libros en un array
      mockGetAll.mockResolvedValue(fakeBooks); // Se envia la data para la prueba
      const books = await service.getBooks({});
      console.log(books);
      expect(books[0].name).toEqual(fakeBooks[0].name);
    });
  });
});
