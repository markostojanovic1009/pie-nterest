const bcrypt = require('bcrypt-nodejs');

exports.seed = function(knex, Promise) {
    var firstUserId;
  return Promise.join(
      // Deletes ALL existing entries
      knex('images').del().then( () => {
        return knex('users').del()
      }).then( () => {
        return knex('users').insert({
          email: 'email@email.com',
          name: 'test_user',
          password: bcrypt.hashSync('password', bcrypt.genSaltSync(10))
        }).returning('id');
      }).then( (userId) => {
          firstUserId = userId;
        return knex('images').insert({user_id: parseInt(userId), title: 'test_image', url: 'testurl.com'});
      }).then(() => {
          return knex('images').insert({user_id: parseInt(firstUserId), title: 'aditional_test_image', url: 'newtesturl.com'});
      })
  );
};
