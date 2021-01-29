function up(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('userId')
        table.string('name');
        table.string('email');
        table.string('password');
        table.string('role').defaultTo('user')
        table.timestamp('created_at', {
            precision: 6
        }).defaultTo(knex.fn.now(6));
        table.timestamp('updated_at', {
            precision: 6
        });
    }).createTable('tweet', (table) => {
        table.increments();
        table.string('tweetId')
        table.string('data');
        table.string('userId');
        table.timestamp('created_at', {
            precision: 6
        }).defaultTo(knex.fn.now(6));
        table.timestamp('updated_at', {
            precision: 6
        });
    }).createTable('tweet_metadata', (table) => {
        table.increments();
        table.string('tweetId')
        table.boolean('action')
        table.string('userId')
        table.timestamp('created_at', {
            precision: 6
        }).defaultTo(knex.fn.now(6));
        table.timestamp('updated_at', {
            precision: 6
        });
    }).createTable('messages', (table) => {
        table.increments();
        table.string('messageId')
        table.string('from')
        table.string('to')
        table.string('data')
        table.string('status')
        table.timestamp('created_at', {
            precision: 6
        }).defaultTo(knex.fn.now(6));
        table.timestamp('updated_at', {
            precision: 6
        });
    })
};

function down(knex) {
    return knex.schema.dropTableIfExists('users')
                .dropTableIfExists('tweet')
                .dropTableIfExists('tweet_metadata')
                .dropTableIfExists('messages')
};

export {
    up,
    down
}