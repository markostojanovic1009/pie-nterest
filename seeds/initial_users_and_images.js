const bcrypt = require('bcrypt-nodejs');

exports.seed = function(knex, Promise) {
    var firstUserId, secondUserId;
    // Deletes ALL existing entries
    return Promise.join(
        knex('liked_images').del().then( () => {
            return knex('images').del()
        }).then( () => {
            return knex('users').del()
        }).then( () => {
            return knex('users').insert({
                email: 'email@email.com',
                name: 'test_user',
                password: bcrypt.hashSync('password', bcrypt.genSaltSync(10))
            }).returning('id');
        }).then( (userId) => {
            firstUserId = userId;
            return knex('images').insert({user_id: parseInt(userId), title: 'Nebula',
                url: 'https://www.nasa.gov/sites/default/files/thumbnails/image/hs-2015-29-a-xlarge_web.jpg'});
        }).then(() => {
            return knex('images').insert({user_id: parseInt(firstUserId), title: 'Beautiful nebula',
                url: 'https://i.ytimg.com/vi/S05yDA-_bF4/maxresdefault.jpg'}).returning("id");
        }).then((secondImageId) => {
            return knex('liked_images').insert({user_id: parseInt(firstUserId), image_id: parseInt(secondImageId)});
        }).then(() => {
            var imageArray = [];
            for(let i = 1; i < 10; i++)
                imageArray.push({user_id: parseInt(firstUserId), title: 'Image number ' + i,
                    url: 'https://www.nasa.gov/sites/default/files/thumbnails/image/hs-2015-29-a-xlarge_web.jpg'});
            return knex('images').insert(imageArray);
        }).then(() => {
            return knex('users').insert({
                email: 'test@test.com',
                name: 'John',
                password: bcrypt.hashSync('password', bcrypt.genSaltSync(10))
            }).returning('id');
        }).then((userId) => {
            secondUserId = userId;
            var imageArray = [];
            for(let i = 1; i < 10; i++)
                imageArray.push({user_id: parseInt(secondUserId), title: 'Generic Image number' + (10 + i),
                    url: 'https://i.ytimg.com/vi/S05yDA-_bF4/maxresdefault.jpg'});
            return knex('images').insert(imageArray);
        })
    );
};
