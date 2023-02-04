/* eslint-disable max-len */
// Pruebas de integración para el endpoint '/'

// Se importa 'request' para hacer peticiones al enpoint
// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest');

// Se importa la aplicación para instanciar una nueva para las pruebas
const { MongoClient } = require('mongodb');
const createApp = require('../app');

// Se importan variables globales
const { config } = require('../config');

// Se importa módulo para conexiones a base de datos

// Se obtiene el nombre de la base de datos para usar en las pruebas
const DB_NAME = config.dbName;
const MONGO_URI = config.dbUrl;

// Se empiezan las pruebas e2e para el endpoint
describe('Test for books enpoint', () => {
  let app = null;
  let server = null;
  let database = null;

  // Antes de ejecutar cualquier cosa se crea y corre la aplicación y se conecta a la base de datos para TESTING
  beforeAll(async () => {
    app = createApp();
    server = app.listen(3001);
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    database = client.db(DB_NAME);
  });

  // Cuando se terminen todas las pruebas se cierra la aplicación y se borra toda la información de la base de datos de TESTING
  afterAll(async () => {
    await server.close();
    await database.collection('books').drop();
  });

  // Se crea el test para el GET al endpoint
  describe('Test for [GET] /api/v1/books', () => {
    test('Should return a list of books', async () => {
      // Arrange
      const seedData = await database.collection('books').insertMany([ // Se inserta data a la base de datos para TESTING
        {
          name: 'book1',
          year: 1998,
          author: 'Andrés',
        },
        {
          name: 'book2',
          year: 1922,
          author: 'Mauricio',
        },
      ]);
      // Act
      return request(app)
        .get('/api/v1/books')
        .expect(200)
        .then(({ body }) => {
          // Assert
          expect(body.length).toEqual(seedData.insertedCount); // Se comprueba que los datos insertados a la base de datos concuerden con lo que se trae
        });
    });
  });
});
