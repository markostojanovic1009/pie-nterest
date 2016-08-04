exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', function(table) {
            table.increments();
            table.string('name');
            table.string('email').unique();
            table.string('password');
            table.string('passwordResetToken');
            table.dateTime('passwordResetExpires');
            table.string('gender');
            table.string('location');
            table.string('website');
            table.string('picture');
            table.string('facebook');
            table.string('twitter');
            table.string('google');
            table.string('vk');
            table.timestamps();
        }).createTable('images', function(table) {
            table.increments();
            table.string("url").notNullable();
            table.string("title");
            table.integer("liked_count");
            table.integer("user_id").references("id").inTable('users');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema
            .dropTable("images")
            .dropTable('users')
    ])
};
