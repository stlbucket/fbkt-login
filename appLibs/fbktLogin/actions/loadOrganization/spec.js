"use strict";
const should = require('should');
const uuid   = require('uuid')
const expect = require('chai').expect;
const fbkt   = require('fbkt');

const pipeDef = require('./index');

describe.skip(__filename, function () {

  it('load an organization', function (done) {
    const testId = uuid.v4();
    const user   = {login: "who@cares.com"};
    const params = {
      name: testId,
      location: {
        name: "Big Mario's",
        geoJson: {type: "Point", coordinates: [-122.347812, 47.627044]}
      },
      contacts: [
        {
          licenses: [
            {
              licenseTypeKey: 'ADMIN',
            }
          ],
          useDefaultPassword: true,
          email: `test@${testId}.com`,
          firstName: 'Test',
          lastName: testId,
          phoneNumber: '',
          jobTitle: '',
          location: {
            name: "Biscuit Bitch",
            geoJson: {type: "Point", coordinates: [-122.341856, 47.610606]}
          }
        },
      ]
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