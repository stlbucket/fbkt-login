"use strict";
const should = require('should');
const uuid   = require('uuid')
const expect = require('chai').expect;
const fbkt   = require('fbkt');

const pipeDef = require('./index');

describe.skip(__filename, function () {

  it('load an application', function (done) {
    const testId = uuid.v4();
    const user   = {login: "who@cares.com"};
    const params = {
      name: testId,
      version: '1.0.0'
    };

    const pipe = pipeDef();

    pipe.execute({
      user: user,
      params: params,
      recordPipe: false
    })
      .then((result)=> {
        fbkt.clog('FUNCTION BUCKET WORKSPACE', pipe.ws, true);
        fbkt.clog('RESULT', result, true);
        done();
      })
      .catch(error=> {
        // fbkt.clog('UNEXPECTED ERROR', error);
        done(error);
      });

  });


});