var assert = require("chai").assert;
var convertCSVHeaderToNationBuilderField = require("../../lib/convertCSVHeaderToNationBuilderField");

describe("matching text to NationBuilder fields", function() {

  describe("with a known match", function() {

    it("returns the match", function(done) {

      var tests = [
        {
          text: "Status",
          expectedMatch: "status"
        },
        {
          text: "Title",
          expectedMatch: "name"
        },
        {
          text: "contact NAme",
          expectedMatch: "contact.name"
        }
      ];

      tests.forEach(function(test) {
        var actualMatch = convertCSVHeaderToNationBuilderField(test.text);
        assert.equal(actualMatch, test.expectedMatch)
      });

      done();

    });

  });

});
