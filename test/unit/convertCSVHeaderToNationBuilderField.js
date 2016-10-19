var assert = require("chai").assert;
var convertCSVHeaderToNationBuilderField = require("../../lib/convertCSVHeaderToNationBuilderField");

describe("matching text to NationBuilder fields", function() {

  describe("with a known match", function() {

    it("returns the match", function(done) {

      var tests = [
        {
          text: "Status",
          expectedMatch: "event.status"
        },
        {
          text: "Title",
          expectedMatch: "event.name"
        },
        {
          text: "contact NAme",
          expectedMatch: "event.contact.name"
        }
      ];

      tests.forEach(function(test) {
        assert.equal(convertCSVHeaderToNationBuilderField(test.text), test.expectedMatch)
      });

      done();

    });

  });

});
