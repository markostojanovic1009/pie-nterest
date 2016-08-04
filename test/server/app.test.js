process.env.NODE_ENV = "test";
var request = require('supertest');
var server = require('../../server');


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

describe('POST /:userId/images', function() {
  let user = {
    email:  'email@email.com',
    password: 'password'
  };
  let token = "";

  before((done) => {
    request(server)
        .post('/login')
        .send(user)
        .end(function(err, res) {
          if(err)
            console.log(err);
          else {
            user = res.body.user;
            token = res.body.token;
            done();
          }
        });
  });

  it('should properly add an image to database', (done) => {
    const testImage = {
      url: 'testurl.net',
      title: 'test_title'
    };
    request(server)
        .post('/' + user.id + '/images')
        .set('Authorization', 'Bearer ' + token)
        .send(testImage)
        .expect(204, done);
  });

});
