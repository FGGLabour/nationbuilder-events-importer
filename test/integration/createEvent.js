var assert = require("chai").assert;
var nock = require('nock')

var NationBuilder = require("../../lib/NationBuilder");

describe("creating an event", function(){

  describe("successfully", function() {

    it("posts to NationBuilder", function(done) {

      var nb = new NationBuilder("example.nation_slug", "example.site_slug", "example.access_token");

      nock("https://example.nation_slug.nationbuilder.com")
      .post("/api/v1/sites/example.site_slug/pages/events?access_token=example.access_token")
      .reply(200, { "foo": "bar" })

      nb.createEvent({}).then(function(response) {
        assert.deepEqual(response, { "foo" : "bar" })
        return done();
      })
    })

  })

})

