var request = require('supertest');

var app = require('../app.js');
var agent = request.agent(app);

describe('GET /', function () {
  it('respond with HTML', function (done) {
    request(app).get('/').expect(200, done);
  })
})

describe('User', function () {

  describe('login', function () {
    it('respond with json', function (done) {
      agent
      .post('/user')
      .send({
        username: 'jacob'
      })
      .expect(200, done);
    })
  })

  describe('auth', function () {
    it('respond with json', function (done) {
      agent
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    })
  })

})

describe('Data', function () {

  describe('GET types', function () {
    it('respond with json data', function (done) {
      agent
      .get('/types')
      .expect('Content-Type', /json/)
      .expect(200, done)
    })
  })

  describe('GET locations', function () {
    it('respond with json data', function (done) {
      agent
      .get('/locations')
      .expect('Content-Type', /json/)
      .expect(200, done)
    })
  })

})

describe('Request', function () {

  describe('POST', function () {
    it('respond with json', function (done) {
      agent
      .post('/request')
      .set('Accept', 'application/json')
      .send({
        description: 'mocha test',
        type: '532099b472ec72563500034f',
        location: '532099ef660335fc2d000342',
        urgent: false
      })
      .expect('Content-Type', /json/)
      .expect(201, done)
    })
  })

  describe('GET', function () {
    it('respond with json', function (done) {
      agent
      .get('/requests')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    })
  })

})
