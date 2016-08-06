var config = require('../knexfile');
var environment = process.env.NODE_ENV || 'development';
var knex = require('knex')(config[environment]);
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('virtuals');
bookshelf.plugin('visibility');


//knex.migrate.latest();

module.exports = bookshelf;
