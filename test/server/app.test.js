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

describe('Image Controller', () => {


    var login  = function(user) {
      return request(server).post('/login').send(user);
    };

  beforeEach((done)=> {
    knex.migrate.rollback()
        .then(() => {
          return knex.migrate.latest();
        })
        .then(()=> {
          return knex.seed.run();
        })
        .then(() => {
          done();
        })
        .catch((error) => {
          console.log("Error initializing database: ", error);
          done();
        });
   });

  afterEach((done) => {
    knex.migrate.rollback().then(() => {
      done();
    });
  });

  describe('POST /:userId/images', function () {

      let user = {
          email: 'email@email.com',
          password: 'password'
      };
      let token = "";

    const testImage = {
      url: 'testurl.net',
      title: 'test_title'
    };

    it('should properly add an image to database', (done) => {
        login(user)
            .then((res) => {
              user = res.body.user;
              token = res.body.token;
              request(server)
                  .post('/' + user.id + '/images')
                  .set('Authorization', 'Bearer ' + token)
                  .send(testImage)
                  .expect(204, done);
            });
    });

    it("should send 401 if user isn't properly authenticated", (done) => {
      var wrongToken = 'wrongToken';
      request(server)
          .post('/' + user.id + '/images')
          .set('Authorization', 'Bearer ' + wrongToken)
          .send(testImage)
          .expect(401, done);
    });

    it('should reject if image does not have title and url', (done) => {
      request(server)
          .post('/' + user.id + '/images')
          .set('Authorization', 'Bearer ' + token)
          .send({title: "", url: ""})
          .expect(400)
          .then((res) => {
            expect(res.body[0]).to.have.property('msg', 'URL cannot be empty.');
            expect(res.body[1]).to.have.property('msg', 'Title cannot be empty.');
            done();
          });
    });
  });

  describe('GET /images', () => {

    it('should get all images from the database', (done)=> {
      request(server).get('/images').expect(200).then((res) => {
        expect(res.body).to.have.length(2);
        done();
      }).catch((err) => {
        done(err)
      });
    });

  });

  describe('GET /:userId/images', function() {

      let user = {
          email: 'email@email.com',
          password: 'password'
      };
      let token = "";

      it('should get all images uploaded by the user', (done) => {
          login(user)
              .then((res) => {
                  user = res.body.user;
                  token = res.body.token;
                  request(server)
                      .get('/' + user.id + '/images')
                      .set('Authorization', 'Bearer ' + token)
                      .expect(200)
                      .then((res) => {
                        expect(res.body).to.have.length(2);
                        done();
                      })
                      .catch((error) => {
                          console.log(error);
                      });
              });
      });

  });
});

