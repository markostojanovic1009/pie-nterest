process.env.NODE_ENV = "test";
var request = require('supertest-as-promised');
var server = require('../../server');
var knexConfig = require('../../knexfile');
var knex = require('knex')(knexConfig['test']);
var chai = require('chai');
var expect = chai.expect;

chai.use(require('chai-as-promised'));

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
                expect(Promise.resolve(knex('images').count('id'))).to.eventually.have.length(res.body.length);
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

    describe('POST /:userId/images/liked', () => {

        let user = {
            email: 'email@email.com',
            password: 'password'
        };
        let token = "";

        it('should like an image', (done) => {
            login(user)
                .then((res) => {
                    user = res.body.user;
                    token = res.body.token;
                    return request(server)
                        .get('/' + user.id + '/images')
                        .set('Authorization', 'Bearer ' + token)
                }).then((res) => {
                request(server)
                    .post('/' + user.id + '/images/liked')
                    .set('Authorization', 'Bearer ' + token)
                    .send({image_id: res.body[0].id})
                    .expect(204)
                    .then(() => {
                        done();
                    })
                    .catch((error) => {
                        done(error);
                    });
            });
        });
    });

});
