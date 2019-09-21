/* eslint-disable no-undef */
const chaihttp = require('chai-http');
const chai = require('chai');

const { expect } = chai;

chai.use(chaihttp);

const User = require('./model');
const app = require('../../app');

describe('auth testing', () => {
  after((done) => {
    User.findOneAndRemove({ email: 'testuser@test.com' }).exec(err => {
      if (err) return done(err);
      return done();
    });
  });

  describe('[registration]', () => {
    it('should register a user', async () => {
      try {
        const testUser = { email: 'testuser@test.com', password: 'abcd1234' }
        const results = await chai.request(app)
          .post('/users/register')
          .send(testUser);
        expect(results.status).to.equal(200);
      } catch (e) {
        done(e);
      }
    });
  });
});
