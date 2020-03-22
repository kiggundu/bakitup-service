import chai from 'chai';
import chaiStr from 'chai-string';
import request from 'supertest';
import Server from '../server';

chai.use(chaiStr);

const expect = chai.expect;

describe('Config', () => {
  it('should get all config', () =>
    request(Server)
      .get('/api/v1/config')
      .expect('Content-Type', /json/)
      .then(resp => {
        expect(resp.body)
          .to.be.an.an('array')
          .of.length(2);
      }));

  it('should add a new config entry and return its URI', () =>
    request(Server)
      .post('/api/v1/config')
      .send({
        source: { path: '/some/new/test/from/path' },
        destination: { path: '/some/new/test/to/path' },
      })
      .expect('Content-Type', /json/)
      .then(resp => {
        expect(resp.body).to.be.an.an('object');
        //.that.has.property('ref')
        //.startsWith('/api/v1/config/');
      }));

  it('should get a config entry by id', () =>
    request(Server)
      .get('/api/v1/config/0')
      .expect('Content-Type', /json/)
      .then(resp => {
        expect(resp.body).to.be.an.an('object');
        //.that.has.property('source');
      }));
});
