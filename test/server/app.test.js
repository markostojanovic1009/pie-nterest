process.env.NODE_ENV = "test";
var request = require('supertest-as-promised');
var server = require('../../server');
var knexConfig = require('../../knexfile');
var knex = require('knex')(knexConfig['test']);
import {expect} from 'chai';

describe('GET /', function() {
  it('should render ok', function(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /contact', function() {
  it('should render ok', function(done) {
    request(server)
      .get('/contact')
      .expect(200, done);
  });
});

