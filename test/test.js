var request = require('supertest');

var app = require('../app.js');
var agent = request.agent(app);

var data = {
  username: 'jacob',
  request: {
    description: 'mocha test',
    urgent: false
  }
};

describe('GET /', function () {
  it('respond with HTML', function (done) {
    request(app).get('/').expect(200, done);
  });
});

describe('User', function () {

  describe('login', function () {
    it('respond with json', function (done) {
      agent
      .post('/user')
      .send({
        username: data.username
      })
      .expect(200)
      .end(function (err, resp) {
        if (err) return done(err);
        data.user = resp.res.body;
        if (data.user.username === data.username) {
          done();
        } else {
          done('wrong username');
        }
      });
    });
  });

  describe('auth', function () {
    it('respond with json', function (done) {
      agent
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, resp) {
        if (err) return done(err);
        data.user = resp.res.body;
        if (data.user.username === data.username) {
          done();
        } else {
          done('wrong username');
        }
      });
    })
  })

})

describe('Data', function () {

  describe('GET types', function () {
    it('respond with json data', function (done) {
      agent
      .get('/types')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, resp) {
        if (err) return done(err);
        data.types = resp.res.body;
        data.request.type = data.types[0]._id;
        if (data.types.length) {
          done();
        } else {
          done('no types?');
        }
      });
    })
  })

  describe('GET locations', function () {
    it('respond with json data', function (done) {
      agent
      .get('/locations')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, resp) {
        if (err) return done(err);
        data.locations = resp.res.body;
        data.request.location = data.locations[0]._id;
        if (data.locations.length) {
          done();
        } else {
          done('no types?');
        }
      });
    })
  })

})

describe('Request', function () {

  describe('POST', function () {
    it('respond with json', function (done) {
      agent
      .post('/request')
      .set('Accept', 'application/json')
      .send(data.request)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, resp) {
        if (err) return done(err);
        data.request = resp.res.body;
        if (data.request) {
          done();
        } else {
          done('no data?');
        }
      });
    })
  })

  describe('GET', function () {
    it('respond with json', function (done) {
      agent
      .get('/requests')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, resp) {
        if (err) return done(err);
        data.requests = resp.res.body;
        if (data.request.urgent === data.requests[0].urgent) {
          done();
        } else {
          done('data mismatch');
        }
      });
    })
  })

  describe('DELETE', function () {
    it('respond with json', function (done) {
      agent
      .del('/request/' + data.request._id)
      .expect(204, done);
    })
  })

})
