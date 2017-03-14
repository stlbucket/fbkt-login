"use strict";
const should = require('should');
const uuid   = require('uuid')
const expect = require('chai').expect;
const fbkt   = require('fbkt');

const pipeDef = require('./findOne');

describe(__filename, function () {

  it.skip('FIND ONE ORGANIZATION', function (done) {
    const testId = uuid.v4();
    const user   = {login: "who@cares.com"};
    const params = {
      id: 2
    };

    const pipe = pipeDef();

    pipe.execute({
      user: user,
      params: params,
      recordPipe: false
    })
      .then((result)=> {
        fbkt().clog('FUNCTION BUCKET WORKSPACE', pipe.ws, true);
        done();
      })
      .catch(error=> {
        fbkt().clog('UNEXPECTED ERROR', error);
        done(error);
      });

  });


});