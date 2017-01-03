import {expect} from 'chai';
import validate, {whitelist} from '../src/index';

describe('validates', () => {
  let res, failed,
    contract = [
      {key: 'age',
        promises: [whitelist],
        msg: (value, row, arg) => value + ' not allowed',
        arg: ['17']
      }];
  describe('whitelist success', done => {
    beforeEach(done => {
      let data = {
        age: '17'
      };

      validate(contract, data)
        .then(data => {
          res = data;
          done();
        })
        .catch(error => done());
    });

    it('pass the validation', () => {
      expect(res).to.equal(true);
    });
  });

  describe('whitelist failed', done => {
    beforeEach(done => {
      let data = {
        age: '19'
      };

      validate(contract, data)
        .then(data => {
          done();
        })
        .catch(error => {
          failed = error;
          done();
        });
    });

    it('fail the validation', () => {
      expect(failed).to.be.an('object');
      expect(failed).to.have.key('age');
      expect(failed.age).to.be.an('array');
      expect(failed.age[0]).to.equal('19 not allowed');
    });
  });
});
