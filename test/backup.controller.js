import chai from 'chai';
import chaiStr from 'chai-string';
import request from 'supertest';
import Server from '../server';
import log from '../server/common/logger';

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
      .get(
        '/api/v1/backup/b43f1f1624e0ae296dfa03cc89de2380abf4568836b47788970bad71c8e27a8c'
      )
      .expect('Content-Type', /json/)
      .then(resp => {
        expect(resp.body)
          .to.be.an.an('object')
          .that.has.property('entry');
      }));

  it('shouldbe able to execute a command against an existing backup id', () =>
    request(Server)
      .put(
        '/api/v1/backup/b43f1f1624e0ae296dfa03cc89de2380abf4568836b47788970bad71c8e27a8c/start '
      )
      .expect('Content-Type', /json/)
      .then(resp => {
        log.info(`Test got response: ${JSON.stringify(resp)} `);
        expect(resp.body)
          .to.be.an.an('object')
          .that.has.property('message');
      }));
});
