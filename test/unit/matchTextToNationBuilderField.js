var assert = require("chai").assert;
var matchTextToNationBuilderField = require("../../lib/matchTextToNationBuilderField");

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
        }
      ];

      tests.forEach(function(test) {
        var actualMatch = matchTextToNationBuilderField(test.text);
        assert.equal(actualMatch, test.expectedMatch)
      });

      done();

    });

  });

});
