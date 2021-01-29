import knex from 'knex'
import config from '../knex-config/knexfile.js'

function knexInstance() {
    return knex(config.development)
}

export default knexInstance