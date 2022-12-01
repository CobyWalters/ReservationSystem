const assert = require('chai').assert;
const expect = require('chai').expect;
var User = require('../backend/models/user.model');
const users = require('../backend/routes/users');
var app = require('../backend/server');
const request = require('supertest');

describe('POST /add', function() {
    it('adds user', function(done) {
        const res = request(app).post('/users/add').send({
            username: 'billybob',
            hashedPassword: 'easy@password',
            firstName: 'william',
            lastName: 'robert',
            email: 'billy@bob.com',
            phoneNumber: '0001112222'
        })
        .end(function(err, res) {
            expect(res.status).to.eq(201)
            expect(res.body.username).to.eq('billybob')
            expect(res.body.password).to.eq('easy@password')
            done();
        });
    });
});
