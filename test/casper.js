// var casper = require('casper').create();

var url = 'http://localhost:3000/';
var testStr = 'CasperJS test';

casper.test.begin('Test asapApp', function (test) {

  casper.start(url, function () {
    test.assertUrlMatch(/#login/, 'We are sent to #login');
    test.assertTitle('Login');
    test.assertExists('#login form');
    this.fill('#login form', {
      username: 'jacob'
    }, true);
  });

  casper.waitForUrl(/#help/, function () {
    test.assertUrlMatch(/#help/, 'After login we are sent to #help');
    test.assertTitle('Request help');
  });

  casper.then(function () {
    this.click('a[href="#monitor"]');
  });

  casper.waitForUrl(/#monitor/, function () {
    test.assertUrlMatch(/#monitor/, 'we go to #monitor');
    test.assertTitle('Monitor');
  });

  casper.then(function () {
    this.click('a[href="#settings"]');
  });

  casper.waitForUrl(/#settings/, function () {
    test.assertUrlMatch(/#settings/, 'we go to #settings');
    test.assertTitle('Settings');
  });

  casper.then(function () {
    this.click('a[href="#help"]');
  });

  casper.waitForUrl(/#help/, function () {
    test.assertUrlMatch(/#help/, 'we go back to #help');
  });

  casper.waitForSelector('input[name="type"]', function () {
    this.click('input[name="type"]');
  });

  casper.waitForSelector('input[name="location"]', function () {
    this.click('input[name="location"]');
  });

  casper.then(function () {
    this.fill('#help form', {
      description: testStr
    }, true);
  });

  casper.waitForUrl(/#monitor/, function () {
    test.assertUrlMatch(/#monitor/, 'we are sent to #monitor');
    var firstTD = this.fetchText('#monitor tr:first-child td:nth-child(5)');
    if (firstTD == testStr) {
      this.echo('Request found', 'INFO');
    } else {
      this.echo('Request not found', 'ERROR');
    }
  });

  casper.thenOpen(url + 'requests', function () {
    var data = JSON.parse(this.getPageContent());
    casper.open(url + 'request/' + data[0]._id, {
      method: 'delete'
    });
  });

  casper.then(function () {
    this.reload(function () {
      this.echo('#monitor reloaded');
      // var firstTD = this.fetchText('#monitor tr:first-child td:nth-child(5)');
      // console.log(firstTD);
      // if (firstTD != testStr) {
      //   this.echo('Request deleted', 'INFO');
      // } else {
      //   this.echo('Request not deleted', 'ERROR');
      // }
    });
  });

  casper.run(function () {
    test.done();
  });

});
