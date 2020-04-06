import chai from 'chai';
import chaiStr from 'chai-string';
import request from 'supertest';
import Server from '../server';

chai.use(chaiStr);

const expect = chai.expect;

describe('Backup', () => {
  it('should get all backup', () =>
    request(Server)
      .get('/api/v1/backup')
      .expect('Content-Type', /json/)
      .then(resp => {
        expect(resp.body)
          .to.be.an.an('array')
          .of.length(2);
      }));

  it('should add a new backup entry and return its URI', () =>
    request(Server)
      .post('/api/v1/backup')
      .send({
        source: { path: '/some/new/test/from/path' },
        destination: { path: '/some/new/test/to/path' },
      })
      .expect('Content-Type', /json/)
      .then(resp => {
        expect(resp.body).to.be.an.an('object');
        //.that.has.property('ref')
        //.startsWith('/api/v1/backup/');
      }));

  it('should get a backup entry by id', () =>
    request(Server)
      .get('/api/v1/backup/0')
      .expect('Content-Type', /json/)
      .then(resp => {
        expect(resp.body).to.be.an.an('object');
        //.that.has.property('source');
      }));

  it('shouldbe able to execute a command against an existing backup id', () =>
    request(Server)
      .get('/api/v1/backup/0/#start')
      .expect('Content-Type', /json/)
      .then(resp => {
        expect(resp.body).to.be.an.an('object');
        //.that.has.property('source');
      }));
});
