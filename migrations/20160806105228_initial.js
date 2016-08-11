exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', (users) => {
            users.increments().onDelete('CASCADE');
            users.string('name');
            users.string('email').unique();
            users.string('password');
            users.string('passwordResetToken');
            users.dateTime('passwordResetExpires');
            users.string('gender');
            users.string('location');
            users.string('website');
            users.string('picture');
            users.string('facebook');
            users.string('twitter');
            users.string('google');
            users.string('vk');
            users.timestamps();
        }).createTable('images', (images) => {
            images.increments().onDelete('CASCADE');
            images.string("url").notNullable();
            images.string("title");
            images.integer("user_id").references("id").inTable('users');
        }).createTable('liked_images', (likedImages) => {
            likedImages.increments();
            likedImages.integer('user_id').references("id").inTable('users');
            likedImages.integer('image_id').references('id').inTable('images');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema
            .dropTableIfExists("liked_images")
            .dropTableIfExists("images")
            .dropTableIfExists('users')
    ])
};
