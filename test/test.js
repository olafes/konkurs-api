const config = require('config');
const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index.js");

const host = `http://localhost:8080`;

chai.use(chaiHttp);
chai.should();

//todo
//no trzeba napisac testy
//i fajnie by bylo to ogarnac:
//https://medium.com/critigenopensource/mocha-unit-testing-pattern-test-suite-setup-code-for-file-separated-test-e339a550dbf6

describe("Something", () => {
  it("Should return costamcostam", done => {
    chai.request(host)
      .get('/')
      .send({})
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
after(done => {
  app.close(done);
});
