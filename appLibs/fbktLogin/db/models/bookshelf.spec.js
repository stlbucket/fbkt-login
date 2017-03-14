'use strict';
const fbkt = require('fbkt');
const expect = require('chai').expect;
const moment = require('moment');
const util   = require('util');
const bookshelf = require('bookshelf');

// const target = require('./index');

describe('your module', () => {

  it.skip('this', function(done){
    fbkt().dbTree.fbkt_login.table.contact.getAll()
      .then(result => {
        fbkt().clog('CONTACCTS', result, true);
        done();
      })
  });
  
  it.skip('should do something useful', (done) => {
    //target...

    fbkt()._appLibs.dbAccess.bookshelf()
      .then(bookshelf => {

        const Contact = bookshelf.Model.extend({
          tableName:  'fbkt_login.contact'
        });

        Contact.fetchAll()
          .then(allContacts => {
            fbkt().clog('ALL CONTACTS', allContacts, true);
            done();
          })
      });

    // fbkt()._appLibs.dbAccess.query({
    //   sql:  'select * from fbkt_login.contact'
    // })
    //   .then(result => {
    //     fbkt().clog('SQL RESULT', result.rows, true);
    //     done();
    //   });
  });

});
