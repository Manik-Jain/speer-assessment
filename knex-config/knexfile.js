import connection from './connection.js'

export default {

  development: {
    client: connection.client,
    connection : connection.devConnection,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    }
  },

  testing : {
    client: connection.client,
    connection : connection.testingConnection,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    }
  }
}