import knexInstance from '../../conf/knex.js'

const knex = knexInstance()
export default class KnexDao {

    async create(table, obj) {
        try {
            return await knex.insert(obj).into(table)
        } catch (error) {
            throw error
        }
    }

    async fetchAll(table) {
        try {
            return await knex.select().table(table)
        } catch (error) {
            throw error
        }
    }

    async fetchOne(columnIdentifier, value, table) {
        try {
            return await knex.select().from(table)
                .where(columnIdentifier, value)
        } catch (error) {
            throw error
        }
    }

    async update(identifier, value, newValue, table) {
        try {
            await knex.update('data', newValue).into(table).where(identifier, value)
        } catch(error) {
            console.log(error)
        }
    }
}